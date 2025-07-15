import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const Profile = () => {
  const user = useSelector((state) => state.user.user); // Assuming user data from Redux
  const token = useSelector((state) => state.user.token);
  const name= useSelector(state => state.user.name);
  const dispatch = useDispatch();

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

  const [hasMobile, setHasMobile] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { email, mobile, address: userAddress } = res.data;
      setEmail(email);
      if (mobile) {
        setMobile(mobile);
        setHasMobile(true);
      }
      if (userAddress) {
        setAddress(userAddress);
        setHasAddress(true);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      toast.error('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update Mobile
  const updateMobile = async () => {
    try {
      await axios.put('/users/update-mobile', { mobile }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Mobile number updated');
      setHasMobile(true);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update mobile');
    }
  };

  // Update Email
  const updateEmail = async () => {
    try {
      await axios.put('/users/update-email', { email }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Email updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update email');
    }
  };

  // Update Address
  const updateAddress = async () => {
    try {
      await axios.put('/users/update-address', address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Address saved');
      setHasAddress(true);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update address');
    }
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
  };

  return (
    <>
      <div style={styles.container}>
      <ToastContainer />
      <h2>My Profile</h2>

      <div style={styles.section}>
        <h4>Name: {name}</h4>
        <p>Email: <input value={email} onChange={(e) => setEmail(e.target.value)} /> 
          <button onClick={updateEmail}>Update Email</button>
        </p>
      </div>

      <div style={styles.section}>
        <p>Mobile: 
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile"
          />
          <button onClick={updateMobile}>
            {hasMobile ? 'Update Mobile' : 'Add Mobile'}
          </button>
        </p>
      </div>

      <div style={styles.section}>
        <h3>Shipping Address</h3>
        <input value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} placeholder="Full Name" />
        <input value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} placeholder="Email" />
        <input value={address.mobile} onChange={(e) => setAddress({ ...address, mobile: e.target.value })} placeholder="Mobile" />
        <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} placeholder="Pincode" />
        <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="City" />
        <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="State" />
        <input value={address.addressLine} onChange={(e) => setAddress({ ...address, addressLine: e.target.value })} placeholder="Address Line" />
        <input value={address.landmark} onChange={(e) => setAddress({ ...address, landmark: e.target.value })} placeholder="Landmark" />
        <select value={address.addressType} onChange={(e) => setAddress({ ...address, addressType: e.target.value })}>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
        </select>
        <button onClick={updateAddress}>{hasAddress ? 'Update Address' : 'Add Address'}</button>
      </div>

      <div style={styles.section}>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
      <Link to="/orders">My Orders</Link>
    </div>
    <Footer/>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '30px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  section: {
    marginBottom: '20px',
  },
  logout: {
    background: '#dc3545',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Profile;
