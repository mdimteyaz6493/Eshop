import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import "../Styles/Profile.css"

const Profile = () => {
  const token = useSelector((state) => state.user.token);
  const name = useSelector(state => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    mobile: '',
    pincode: '',
    city: '',
    state: '',
    addressLine: '',
    landmark: '',
    addressType: 'Home',
  });

  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { email, mobile, address: userAddress } = res.data;
        if (email) setEmail(email);
        if (mobile) setMobile(mobile);
        if (userAddress) setAddress(userAddress);
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [token]);

  const updateAddress = async () => {
    try {
      await axios.put('/users/update-address', address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Address saved');
      setShowAddressPopup(false);
    } catch (err) {
      toast.error('Failed to update address');
    }
  };

  const updateEmailAndMobile = async () => {
    try {
      await axios.put('/users/update-email', { email }, { headers: { Authorization: `Bearer ${token}` } });
      await axios.put('/users/update-mobile', { mobile }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Updated successfully');
      setShowLoginPopup(false);
    } catch (err) {
      toast.error('Failed to update email/mobile');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <>
      <ToastContainer />
      <div className="profile-container">
        <div className="top-bar">
          <h2>Hello, {name}</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="card-list">
          <div className="profile-card" onClick={() => navigate('/orders')}>
           <img src="./parcel.png" alt="" />
           <div className="card_details">
             <h3>Your Orders</h3>
            <p>Track, return or reorder items</p>
           </div>
          </div>

          <div className="profile-card" onClick={() => setShowAddressPopup(true)}>
           <img src="./location.png" alt="" />
            <div className="card_details">
              <h3>Your Address</h3>
            <p>Add or edit your shipping address</p>
            </div>
          </div>

          <div className="profile-card" onClick={() => setShowLoginPopup(true)}>
           <img src="./security.png" alt="" />
            <div className="card_details">
              <h3>Login & Security</h3>
            <p>Edit email or mobile number</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Popup */}
    {showAddressPopup && (
  <div className="popup-overlay">
  <div className="popup">
    <h3>Update Address</h3>

    {/* Full Name - One Row */}
    <div className="form-row">
      <div className="form-group">
        <label>Full Name</label>
        <input
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
          placeholder="Full Name"
        />
      </div>
    </div>

    {/* Mobile & Email - One Row */}
    <div className="form-row">
      <div className="form-group">
        <label>Mobile</label>
        <input
          value={address.mobile}
          onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
          placeholder="Mobile"
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          value={address.email}
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
          placeholder="Email"
        />
      </div>
    </div>

    {/* Pincode, City & State - One Row */}
    <div className="form-row">
      <div className="form-group">
        <label>Pincode</label>
        <input
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          placeholder="Pincode"
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          placeholder="City"
        />
      </div>
      <div className="form-group">
        <label>State</label>
        <input
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          placeholder="State"
        />
      </div>
    </div>

    {/* Address Line - One Row */}
    <div className="form-row">
      <div className="form-group full-width">
        <label>Address Line</label>
        <textarea
          value={address.addressLine}
          onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
          placeholder="Address"
          className='f_address'
        />
      </div>
    </div>

    {/* Landmark & Address Type - One Row */}
    <div className="form-row">
      <div className="form-group">
        <label>Landmark</label>
        <input
          value={address.landmark}
          onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
          placeholder="Landmark"
        />
      </div>
      <div className="form-group">
        <label>Address Type</label>
        <select
          value={address.addressType}
          onChange={(e) => setAddress({ ...address, addressType: e.target.value })}
        >
          <option value="Home">Home</option>
          <option value="Work">Work</option>
        </select>
      </div>
    </div>

    {/* Buttons */}
    <div className="popup-btns">
      <button onClick={updateAddress}>Save</button>
      <button className="cancel" onClick={() => setShowAddressPopup(false)}>Cancel</button>
    </div>
  </div>
</div>

)}

      {/* Login Popup */}
    {showLoginPopup && (
  <div className="popup-overlay">
    <div className="popup">
      <h3>Login & Security</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            placeholder="Enter your mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
      </div>

      <div className="popup-btns">
        <button onClick={updateEmailAndMobile}>Save</button>
        <button className="cancel" onClick={() => setShowLoginPopup(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
};

export default Profile;
