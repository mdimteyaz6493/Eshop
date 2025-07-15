import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer/Footer';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/products/all`)
      .then((res) => {
        const filtered = res.data.filter(
          (product) => product.category.toLowerCase() === categoryName
        );
        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [categoryName]);

  return (
   <>
     <div style={{ padding: '20px' }}>
      <h2>Category: {categoryName}</h2>
      {products.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
    <Footer/>
   </>
  );
};

export default CategoryProducts;
