import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer/Footer';
import "../Styles/categoryproduct.css"

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
      <div className="category-products-container">
        <h2 className="category-products-heading">Category: {categoryName}</h2>
        {products.length === 0 ? (
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
