import React, { useState } from 'react';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      <p style={styles.linkText}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  heading: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  linkText: {
    marginTop: '10px'
  }
};

export default Register;
