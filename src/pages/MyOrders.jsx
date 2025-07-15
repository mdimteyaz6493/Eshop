import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.token);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders/myorders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
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
      fetchOrders(); // refresh orders
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel the order');
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => {
            const isCancellable = order.orderStatus != "cancelled" && order.orderStatus != "shipped" &&order.orderStatus != "delivered";

            return (
              <div key={order._id} style={styles.orderBox}>
                <h4>Order ID: {order._id}</h4>
                <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                <button
                  onClick={() => handleCancelOrder(order._id)}
                  style={{
                    ...styles.cancelButton,
                    backgroundColor: isCancellable ? '#dc3545' : '#ccc',
                    cursor: isCancellable ? 'pointer' : 'not-allowed',
                  }}
                  disabled={!isCancellable}
                >
                  Cancel Order
                </button>

                <hr />
                <ul style={styles.itemList}>
                  {order.orderItems.map((item, index) => (
                    <li key={index} style={styles.item}>
                      <img src={item.image} alt={item.name} style={styles.image} />
                      <div>
                        <p><strong>{item.name}</strong></p>
                        <p>Qty: {item.qty}</p>
                        <p>Price: ₹{item.price}</p>
                        <p>Total: ₹{item.qty * item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: 'auto',
  },
  orderBox: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '25px',
    backgroundColor: '#f9f9f9',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    alignItems: 'center',
  },
  image: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  cancelButton: {
    padding: '10px 15px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
  },
};

export default MyOrders;
