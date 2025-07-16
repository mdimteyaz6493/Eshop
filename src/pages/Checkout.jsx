import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../axios';
import { clearCart } from '../redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/checkout.css"
import Footer from "../components/Footer/Footer"

const Checkout = () => {
  const cart = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowItem = location.state?.buyNowItem;
  const orderItems = buyNowItem ? [buyNowItem] : cart;
  const total = orderItems.reduce((sum, i) => sum + i.qty * i.price, 0);

  const [step, setStep] = useState(0);
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState({
    pincode:'', city:'', state:'', fullName:'', email:'', fullAddress:'', landmark:'', addressType:'Home'
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [savedProfile, setSavedProfile] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState('');

  useEffect(() => {
    axios.get('/users/profile', { headers:{Authorization:`Bearer ${token}`}})
      .then(res => setSavedProfile(res.data))
      .catch(console.error);
  }, [token]);

  const handleSetMode = mode => {
    setCheckoutMode(mode);
    setStep(mode === 'saved' ? 3 : 1);
  };

  const handlePlaceOrder = async (shipping) => {
    try {
      await axios.post('/orders', { orderItems, shippingAddress:shipping, paymentMethod, totalPrice:total}, { headers:{Authorization:`Bearer ${token}`} });
      toast.success('Order placed!');
      if (!buyNowItem) dispatch(clearCart());
      setTimeout(() => navigate('/'), 1000);
    } catch {
      toast.error('Order failed');
    }
  };

  return (
   <>
     <div className="checkout-container">
      <ToastContainer />
      <h2>Checkout</h2>
      <div className="progress-bar">
  <div className={`step ${step >= 0 ? 'done' : ''}`}>1</div>
  <div className={`line ${step >= 1 ? 'done' : ''}`}></div>
  <div className={`step ${step >= 1 ? 'done' : ''}`}>2</div>
  <div className={`line ${step >= 3 ? 'done' : ''}`}></div>
  <div className={`step ${step >= 3 ? 'done' : ''}`}>3</div>
</div>


      {step===0 && (
        <div className="options-card">
          <div className="option saved" onClick={() => handleSetMode('saved')}>
            <h3>Use Saved Details</h3>
            {savedProfile?.mobile && savedProfile.address ? (
              <>
                <p>{savedProfile.mobile}</p>
                <p>{`${savedProfile.address.addressLine}, ${savedProfile.address.city}`}</p>
              </>
            ) : <p>No saved data</p>}
          </div>
          <div className="option new" onClick={() => handleSetMode('new')}>
            <h3>Enter New Details</h3>
            <p>Fill in fresh information</p>
          </div>
        </div>
      )}

      {step===1 && checkoutMode==='new' && (
        <div className="form-card">
          <h3>Step 1: Mobile</h3>
          <input type="tel" placeholder="10-digit mobile" maxLength="10" value={mobile} onChange={e=>setMobile(e.target.value)}/>
          <button disabled={mobile.length!==10} onClick={()=>setStep(2)}>Continue</button>
        </div>
      )}

      {step===2 && (
        <div className="form-card">
          <h3>Step 2: Shipping Address</h3>
          <div className="address-grid">
            {/* pincode, city, state */}
            <input placeholder="Pincode" value={address.pincode} onChange={e=>setAddress({...address,pincode:e.target.value})}/>
            <input placeholder="City" value={address.city} onChange={e=>setAddress({...address,city:e.target.value})}/>
            <input placeholder="State" value={address.state} onChange={e=>setAddress({...address,state:e.target.value})}/>
          </div>
          <input placeholder="Full Name" value={address.fullName} onChange={e=>setAddress({...address,fullName:e.target.value})}/>
          <input type="email" placeholder="Email" value={address.email} onChange={e=>setAddress({...address,email:e.target.value})}/>
          <textarea placeholder="Address Line" value={address.fullAddress} onChange={e=>setAddress({...address,fullAddress:e.target.value})}/>
          <div className="address-grid">
            <input placeholder="Landmark" value={address.landmark} onChange={e=>setAddress({...address,landmark:e.target.value})}/>
            <select value={address.addressType} onChange={e=>setAddress({...address,addressType:e.target.value})}>
              <option>Home</option><option>Work</option>
            </select>
          </div>
          <button disabled={!address.pincode || !address.city || !address.fullAddress} onClick={()=>setStep(3)}>Continue</button>
        </div>
      )}

      {step===3 && (
        <div className="form-card">
          <h3>Step 3: Payment & Review</h3>
          <label><input type="radio" value="COD" checked={paymentMethod==='COD'} onChange={e=>setPaymentMethod(e.target.value)}/> Cash</label>
          <label><input type="radio" value="UPI" checked={paymentMethod==='UPI'} onChange={e=>setPaymentMethod(e.target.value)}/> UPI</label>
          <label><input type="radio" value="Card" checked={paymentMethod==='Card'} onChange={e=>setPaymentMethod(e.target.value)}/> Card</label>
          <div className="summary">
            <p><strong>Items:</strong> {orderItems.length}</p>
            <p><strong>Total:</strong> ₹{total}</p>
          </div>
          <button disabled={!paymentMethod} onClick={() => {
            const shipping = checkoutMode==='saved'
              ? {...savedProfile.address, mobile:savedProfile.mobile}
              : {...address, addressLine:address.fullAddress, mobile};
            delete shipping.fullAddress;
            handlePlaceOrder(shipping);
          }}>
            Place Order
          </button>
        </div>
      )}
    </div>
    <Footer/>
   </>
  );
};

export default Checkout;
