import React, { useState } from 'react';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      if (res.data.token) {
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('userName', res.data.name);
        dispatch(setUser({ token: res.data.token, name: res.data.name }));
        toast.success('Logged in');
        setTimeout(() => navigate('/'), 500);
      }
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" required style={styles.input} onChange={e => setForm({...form, [e.target.name]: e.target.value})} />
        <input name="password" type="password" placeholder="Password" required style={styles.input} onChange={e => setForm({...form, [e.target.name]: e.target.value})} />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

const styles = { /* similar inline styles as before */ };

export default Login;
