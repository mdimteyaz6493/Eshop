import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const isOutOfStock = product.countInStock <= 0;

  return (
    <div
      style={{
        ...styles.card,
        filter: isOutOfStock ? 'grayscale(100%)' : 'none',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative' }}>
          <img src={product.image} alt={product.name} style={styles.image} />
          {isOutOfStock && (
            <div style={styles.overlay}>
              <span style={styles.outOfStockText}>Out of Stock</span>
            </div>
          )}
        </div>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>₹{product.price}</p>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '6px',
    padding: '10px',
    textAlign: 'center',
    width: '250px',
    margin: '10px',
    transition: '0.3s ease',
    height:'320px',
    boxShadow:'2.5px 2.5px 8px rgba(0,0,0,0.2)',
    backgroundColor:'white'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    borderRadius: '6px',
    
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
  },
  outOfStockText: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  name: {
    fontSize: '0.95rem',
    margin: '10px 0',
    textAlign:"left",
    margin:"10px 10px",
    fontWeight:"500"
  },
  price: {
    fontSize: '1rem',
    fontWeight: '400',
    color: 'black',
    textAlign:"left",
    margin:"10px 10px",
    backgroundColor:"#3ac222ff",
    width:"70px",
    padding:"5px 10px",
    borderRadius:"5px",
    color:"white",
    bottom:"0"
  },
};

export default ProductCard;
