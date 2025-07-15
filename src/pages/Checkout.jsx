import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../axios';
import { clearCart } from '../redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowItem = location.state?.buyNowItem;
  const orderItems = buyNowItem ? [buyNowItem] : cart;

  const [step, setStep] = useState(0); // Step 0: Choose method
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState({
    pincode: '',
    city: '',
    state: '',
    fullName: '',
    email: '',
    fullAddress: '',
    landmark: '',
    addressType: 'Home',
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const total = orderItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const [savedProfile, setSavedProfile] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState(''); // 'saved' or 'new'


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  const handlePlaceOrder = async (shipping) => {
    try {
      await axios.post(
        '/orders',
        {
          orderItems,
          shippingAddress: shipping,
          paymentMethod,
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Order placed successfully!');
      if (!buyNowItem) dispatch(clearCart());
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error(err);
      toast.error('Order failed. Please try again.');
    }
  };

const handleSavedDetailsContinue = () => {
  setCheckoutMode('saved');
  setStep(3);
};
 const handleNewDetailsContinue = () => {
  setCheckoutMode('new');
  setStep(1);
};

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2>Checkout</h2>

      {step === 0 && (
        <>
          <div style={styles.cardWrapper}>
            <div style={styles.card}>
              <h4>Use Saved Details</h4>
              {savedProfile?.mobile && savedProfile?.address ? (
                <>
                  <p><strong>Mobile:</strong> {savedProfile.mobile}</p>
                  <p><strong>Address:</strong> {savedProfile.address.addressLine}, {savedProfile.address.city}, {savedProfile.address.state} - {savedProfile.address.pincode}</p>
                  <button style={styles.button} onClick={handleSavedDetailsContinue}>
                    Continue with Saved Details
                  </button>
                </>
              ) : (
                <p>No saved details available.</p>
              )}
            </div>
            <div style={styles.card}>
              <h4>Enter New Details</h4>
              <button style={styles.button} onClick={handleNewDetailsContinue}>
                Enter New Details
              </button>
            </div>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h4>Step 1: Mobile Number</h4>
          <input
            type="tel"
            value={mobile}
            placeholder="Enter mobile number"
            onChange={(e) => setMobile(e.target.value)}
            style={styles.input}
            maxLength="10"
          />
          <button
            style={styles.button}
            disabled={mobile.length !== 10}
            onClick={() => setStep(2)}
          >
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h4>Step 2: Shipping Address</h4>
          <input placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} style={styles.input} />
          <input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} style={styles.input} />
          <input placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} style={styles.input} />
          <input placeholder="Full Name" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} style={styles.input} />
          <input type="email" placeholder="Email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} style={styles.input} />
          <textarea placeholder="Full Address" value={address.fullAddress} onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })} style={styles.textarea} />
          <input placeholder="Landmark" value={address.landmark} onChange={(e) => setAddress({ ...address, landmark: e.target.value })} style={styles.input} />
          <div>
            <label>
              <input type="radio" value="Home" checked={address.addressType === 'Home'} onChange={(e) => setAddress({ ...address, addressType: e.target.value })} />
              Home
            </label>
            <label style={{ marginLeft: '15px' }}>
              <input type="radio" value="Work" checked={address.addressType === 'Work'} onChange={(e) => setAddress({ ...address, addressType: e.target.value })} />
              Work
            </label>
          </div>
          <button
            style={styles.button}
            onClick={() => setStep(3)}
            disabled={
              !address.pincode ||
              !address.city ||
              !address.state ||
              !address.fullName ||
              !address.email ||
              !address.fullAddress
            }
          >
            Continue to Payment
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h4>Step 3: Payment Method</h4>
          <label><input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery</label><br />
          <label><input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} /> UPI</label><br />
          <label><input type="radio" value="Card" checked={paymentMethod === 'Card'} onChange={(e) => setPaymentMethod(e.target.value)} /> Credit/Debit Card</label>
          <p><strong>Total:</strong> ₹{total}</p>
          <button
            style={styles.button}
onClick={() => {
  let shipping;

  if (checkoutMode === 'saved') {
    if (savedProfile?.mobile && savedProfile?.address) {
      shipping = {
        ...savedProfile.address,
        mobile: savedProfile.mobile,
      };
    } else {
      return toast.error("No saved address or mobile found.");
    }
  } else if (checkoutMode === 'new') {
    shipping = {
      ...address,
      addressLine: address.fullAddress,
      mobile,
    };
    delete shipping.fullAddress;
  }

  handlePlaceOrder(shipping);
}}


            disabled={!paymentMethod}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
  cardWrapper: {
    display: 'flex',
    gap: '20px',
    flexDirection: 'column',
  },
  card: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
};

export default Checkout;
