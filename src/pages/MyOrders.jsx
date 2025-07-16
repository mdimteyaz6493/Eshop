import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/myorder.css"

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.token);

 const fetchOrders = async () => {
  try {
    const res = await axios.get('/orders/myorders', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOrders(sortedOrders);
  } catch (err) {
    console.error(err);
    toast.error('Failed to load your orders');
  }
};


  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`/orders/${orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order cancelled successfully!');
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel the order');
    }
  };

  return (
    <div className="orders-container">
      <ToastContainer />
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <img src="/empty-cart.png" alt="Empty Orders" />
          <p>You haven’t placed any orders yet.</p>
        </div>
      ) : (
        orders.map((order) => {
          const isCancellable =
            order.orderStatus !== 'cancelled' &&
            order.orderStatus !== 'shipped' &&
            order.orderStatus !== 'delivered';

          return (
            <div key={order._id} className="order-box">
              <div className="order-header">
                <h4>Order #{order._id.slice(-6)}</h4>
                <span className={`status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="order-details">
                <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div className="items-list">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="item-card">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p>Qty: {item.qty}</p>
                      <p>Price: ₹{item.price}</p>
                      <p>Total: ₹{item.qty * item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={`cancel-btn ${isCancellable ? '' : 'disabled'}`}
                onClick={() => handleCancelOrder(order._id)}
                disabled={!isCancellable}
              >
                Cancel Order
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;
