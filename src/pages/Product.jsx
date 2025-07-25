import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCategSlider from "../components/HomeComp/ProductCategSlider/ProductCategSlider";
import Footer from "../components/Footer/Footer";
import { HiStar } from "react-icons/hi";

import "../Styles/Product.css";
import ProductpageFeatures from "../components/ProductPage/ProductpageFeatures";
import ProductSpecification from "../components/ProductPage/ProductSpecification";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        const data = res.data;
        setProduct(data);
        setSelectedImage(data.images[0]);


        const allRes = await axios.get("/products/all");
        const filtered = allRes.data.filter(
          (p) => p.category === data.category && p._id !== data._id
        );
        setRelatedProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  // For magnifier hover effect
  useEffect(() => {
    const container = document.querySelector(".magnifier-container");
    const image = document.querySelector(".main-product-image");

    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      image.style.setProperty("--x", `${x}%`);
      image.style.setProperty("--y", `${y}%`);
    };

    if (container && image) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container && image) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [selectedImage]);

  const handleAddCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: selectedImage,
        desc: product.description,
        qty,
      })
    );
    toast.success("Added to cart!");
    navigate("/cart")
  };

  const handleBuyNow = () => {
    const orderItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      qty,
    };
    navigate("/checkout", { state: { buyNowItem: orderItem } });
  };

  return product ? (
    <>
      <div className="product-container">
        <ToastContainer />
        <div className="cont">
          <div className="img_part">
            <div className="thumbnails">
              {Array.isArray(product.images) &&
                product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`thumbnail-img ${
                      selectedImage === img ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>

            <div className="magnifier-container">
              <img
                src={selectedImage}
                alt={product.name}
                className="main-product-image"
              />
            </div>
          </div>

          <div className="product-info">
            <span className="rating">
              <HiStar className="star" />
              4.5
            </span>
            <h2>{product.name}</h2>
            <div className="price_lable">
              <p>₹{product.price}</p>
              <strike className="og_price">₹{product.price + 1000}</strike>
              <span className="discount">
                {Math.floor((product.price / (product.price + 1000)) * 100)}% off
              </span>
            </div>
            <p>{product.description}</p>

            <label>
              Quantity:
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(5).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </label>

            <div className="btn_grp">
              <button
                onClick={handleAddCart}
                className="product-button"
                disabled={product.countInStock === 0}
              >
                {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
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

      <ProductpageFeatures />
      <ProductSpecification product={product} />

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
