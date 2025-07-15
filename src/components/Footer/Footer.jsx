import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section brand-section">
          <h2 className="footer-logo">E-Shop</h2>
          <p className="footer-tagline">Your one-stop tech destination 🚀</p>
          <p className="footer-copy">© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Shop Categories</h4>
          <ul className="footer-links">
            <li><Link to="/category/smartwatch" className="link">Smartwatches</Link></li>
            <li><Link to="/category/laptop" className="link">Laptops</Link></li>
            <li><Link to="/category/iphone" className="link">iPhones</Link></li>
            <li><Link to="/category/camera" className="link">Cameras</Link></li>
            <li><Link to="/category/earbuds" className="link">Earbuds</Link></li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-section">
          <h4 className="footer-title">Contact Us</h4>
          <p><FaEnvelope /> support@eshop.com</p>
          <p><FaPhone /> +91 98765 43210</p>
          <p><FaMapMarkerAlt /> Delhi, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
