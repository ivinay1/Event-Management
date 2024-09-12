const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();

// Place an order
router.post('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const totalAmount = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const newOrder = new Order({
      userId: req.params.userId,
      items: cart.items,
      totalAmount,
      status: 'Pending',
    });

    await newOrder.save();
    await Cart.findByIdAndDelete(cart._id); // Clear cart after order is placed

    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Get user's orders
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Update order status
router.put('/:orderId', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

module.exports = router;
