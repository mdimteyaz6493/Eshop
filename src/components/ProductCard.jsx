import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/productcard.css';

const ProductCard = ({ product }) => {
  const isOutOfStock = product.countInStock <= 0;

  return (
    <div
      className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}
    >
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          {isOutOfStock && (
            <div className="product-overlay">
              <span className="out-of-stock-text">Out of Stock</span>
            </div>
          )}
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
