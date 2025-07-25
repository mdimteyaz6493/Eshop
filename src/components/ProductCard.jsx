import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/productcard.css";
import { HiStar } from "react-icons/hi";

const ProductCard = ({ product }) => {
  const isOutOfStock = product.countInStock <= 0;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`}>
      <Link to={`/product/${product._id}`} className="product-link">

      <div className="image_part">
        <img src={product.images[0]} alt={product.name} />
      </div>
      <div className="card_bottom">
        <div className="card-body">
          <span className="rating">
            <HiStar className="star" />
            4.5
          </span>
          {!isMobile ? (
            <>
              <span className="p_name">
                {product.name.length > 20
                  ? product.name.slice(0, 25)
                  : product.name}
              </span>
            </>
          ) : (
            <>
              <span className="p_name">
                {product.name.length > 20
                  ? product.name.slice(0, 20)
                  : product.name}
              </span>
            </>
          )}

          {!isMobile && (
            <span className="p_desc">
              {product.description.length > 100
                ? product.description.slice(0, 60) + "..."
                : product.description}
            </span>
          )}

          <div className="price_lable">
            <span className="p_price">₹{product.price}</span>
            <strike className="og_price">₹{product.price + 1000}</strike>
            <span className="discount">
              {Math.floor((product.price / (product.price + 1000)) * 100)}% off
            </span>
          </div>
        </div>
        <button className="view_btn">View Product</button>
      </div>
      </Link>
    </div>
  );
};

export default ProductCard;
