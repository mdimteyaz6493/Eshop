import React from 'react';
import ProductCard from '../ProductCard';

const Products = ({ products }) => {
  return (
    <div style={styles.list}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
};

export default Products;
