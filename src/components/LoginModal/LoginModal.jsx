import React, { useState } from 'react';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginModal.css'; // create this file for styles

const LoginModal = ({ onClose ,onSwitch}) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      if (res.data.token) {
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('userName', res.data.name);
        dispatch(setUser({ token: res.data.token, name: res.data.name }));
        toast.success('Logged in');
        onClose(); // close modal after login
      }
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <ToastContainer />
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
         <p>
  Don't have an account?{' '}
  <button
    type="button"
    className="switch-link"
    onClick={onSwitch}
  >
    Register
  </button>
</p>

      </div>
    </div>
  );
};

export default LoginModal;
