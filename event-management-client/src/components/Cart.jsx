import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = ({ userId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${userId}`, { productId, quantity });
      fetchCart();
    } catch (err) {
      console.error('Error updating cart item:', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      fetchCart();
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/orders/${userId}`);
      alert('Order placed successfully!');
      setCart(null);
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart && cart.items.length > 0 ? (
        <div>
          <ul>
            {cart.items.map((item) => (
              <li key={item.productId._id}>
                <span>{item.productId.name} - {item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                <button onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
