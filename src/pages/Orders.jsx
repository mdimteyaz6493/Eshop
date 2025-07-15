import React, { useEffect, useState } from 'react';
import axios from '../axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/orders/myorders')
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={styles.container}>
      <h2>My Orders</h2>
      {orders.map(order => (
        <div key={order._id} style={styles.order}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total: ₹{order.totalPrice}</strong></p>
          <p><strong>Items:</strong> {order.orderItems.length}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
  order: {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '6px'
  }
};

export default Orders;
