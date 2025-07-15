import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCategSlider from "../components/HomeComp/ProductCategSlider/ProductCategSlider";
import Footer from '../components/Footer/Footer';

import "../Styles/Product.css"

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);

        const allRes = await axios.get('/products/all');
        const filtered = allRes.data.filter(
          (p) => p.category === res.data.category && p._id !== res.data._id
        );
        setRelatedProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        desc:product.description,
        qty,
      })
    );
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    const orderItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
    };
    navigate('/checkout', { state: { buyNowItem: orderItem } });
  };

  return product ? (
    <>
      <div className="product-container">
        <ToastContainer />
       <div className="cont">
         <div className="img_part">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>₹{product.price}</p>
          <p>About this Item </p>
          <p>{product.description}</p>
          <label>
            Quantity:
            <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {[...Array(5).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </label>
          <div className='btn_grp'>
            <button
              onClick={handleAddCart}
              className="product-button"
              disabled={product.countInStock === 0}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="product-button buy-now"
              disabled={product.countInStock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
       </div>
      </div>

      {relatedProducts.length > 0 && (
        <ProductCategSlider products={relatedProducts} />
      )}
      <Footer />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Product;
