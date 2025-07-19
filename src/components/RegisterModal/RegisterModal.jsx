import React, { useState } from 'react';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/register', form);
      if (res.data.token) {
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('userName', res.data.name);
        dispatch(setUser({ token: res.data.token, name: res.data.name }));
        toast.success('Registration successful!');
        onClose(); // Close the modal after success
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="register-modal-overlay">
      <div className="register-modal">
        <button className="register-close-btn" onClick={onClose}>×</button>
        <ToastContainer />
        <h2 className="register-heading">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="register-linkText">
          Already have an account?{' '}
          <button type="button" onClick={onSwitch} className="register-switch-link">
  Login
</button>

        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
