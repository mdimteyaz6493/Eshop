import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";


import "../Styles/cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {!cart.length ? (
          <p>
            Your cart is empty <Link to="/">Go Shopping</Link>
          </p>
        ) : (
          <>
            <div className="cart_content">
              <div className="cart_item_details">
                {cart.map((item) => (
                  <div key={item.product} className="cart-item">
                    <div className="cart_item_img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart_item_desc">
                      <Link
                        to={`/product/${item.product}`}
                        className="item_name"
                      >
                        {item.name}
                      </Link>
                      <p>
                        {item.desc.split(" ").slice(0, 28).join(" ")}
                        {item.desc.split(" ").length > 12 && "..."}
                      </p>
                      <p>In Stock</p>

                     <div className="cart_details_opt">
                       <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart({ ...item, qty: Number(e.target.value) })
                          )
                        }
                      >
                        {[...Array(5).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => dispatch(removeFromCart(item.product))}
                      >
                        Remove
                      </button>
                     </div>
                    </div>
                    <span className="item_price">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="cart-checkout">
              <div className="top">
                {!isMobile &&  <p>You are eligible for free delivery</p>}
                <h3>{!isMobile && "Total Amount :"}  ₹{total}</h3>
              </div>
                <button onClick={() => navigate("/checkout")}>
                 {!isMobile ? "Proceed to checkout" : "Pay Now"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
