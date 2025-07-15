import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Header = () => {
  const { token, name, cart } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div>
        <Link to="/" style={styles.logo}>E-Shop</Link>
      </div>
      <nav style={styles.nav}>
        <Link to="/cart" style={styles.link}>
        Cart
          {/* Cart ({cart.items.length}) */}
        </Link>
        {token ? (
          <>
            <Link to="/profile">My Profile</Link>

          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    background: '#333',
    color: '#fff',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:"80px"
  },
  logo: {
    color: '#fff',
    fontSize: '24px',
    textDecoration: 'none'
  },
  nav: { display: 'flex', alignItems: 'center', gap: '15px' },
  link: { color: '#fff', textDecoration: 'none' },
  button: {
    background: '#e74c3c',
    border: 'none',
    color: '#fff',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default Header;
