import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer/Footer';
import "../Styles/categoryproduct.css"

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


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

useEffect(() => {
  setLoading(true); // Show loading before fetching
  axios
    .get(`/products/all`)
    .then((res) => {
      const filtered = res.data.filter(
        (product) => product.category.toLowerCase() === categoryName
      );
      setProducts(filtered);
      setLoading(false); // Hide loading after fetching
    })
    .catch((err) => {
      console.error(err);
      setLoading(false); // Hide loading even if there's an error
    });
}, [categoryName]);


    useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <>
    
      <div className="category-products-container">
       {loading ? (
  <p className="loading-text">Loading...</p>
) : products.length === 0 ? (
  <p className="category-products-empty">No products found for this category.</p>
) : (
  <div className="category-products-list">
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
)}

      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
