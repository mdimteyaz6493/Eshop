import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from '../axios';
import "../Styles/Header.css";
import categories from "../components/HomeComp/CatgoriesSlider/categories";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsCart4 } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";



const Header = () => {
  const { token, name } = useSelector(state => state.user);
  const cartCount = useSelector(state => state.cart.items.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="logo-container">
        <Link to="/" className="logo">E‑Shop</Link>
      </div>

      <nav className="main-nav">
        <div className="menu_options">
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropbtn" onClick={() => setOpenDropdown(prev => !prev)}>
              All Categories ▾
            </button>
            <div className={openDropdown ? "dropdown-content dropdown_show" : "dropdown-content"}>
              {categories.map(cat => (
                <Link to={`/category/${cat.name.toLowerCase()}`} className="dropdown-item" onClick={() => setOpenDropdown(prev => !prev)}>
                  <div className="d_item_img">
                    <img src={cat.image} alt={cat.name} />
                  </div>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <button><HiMagnifyingGlass /></button>
          </div>
        </div>

        <div className="profile_options">
          <Link to="/cart" className="nav-link">
            <BsCart4 className='ic'/>
              <span className="cart-badge">{cartCount}</span>
          </Link>

          {token ? (
            <>
              <Link to="/profile" className="nav-link">
                <BsFillPersonFill className='ic'/>
 {name ? name.split(' ')[0] : 'User'}
              </Link>
  
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
