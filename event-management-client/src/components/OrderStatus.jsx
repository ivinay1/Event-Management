import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderStatus.css';

const OrderStatus = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  return (
    <div className="order-status">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Items:</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.productId._id}>{item.productId.name} - {item.quantity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no orders.</p>
      )}
    </div>
  );
};

export default OrderStatus;
