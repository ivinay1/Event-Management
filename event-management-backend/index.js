const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authenticateAdmin = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const eventRoutes = require('./routes/eventRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const reportingRoutes = require('./routes/reportingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/event_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample user data
const users = [
  { email: 'admin@example.com', password: 'password123' }, // Sample user for demonstration
  // Add more users or connect to your user database here
];

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid email or password' });
  }
});

// Admin route
app.get('/admin', authenticateAdmin, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Event Management System API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api/users', userRoutes);

app.use('/api/vendors', vendorRoutes);

app.use('/api/memberships', membershipRoutes);

app.use('/api/profile', profileRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/notifications', notificationRoutes);

app.use('/api/messages', messageRoutes);

app.use('/api/reports', reportingRoutes);

app.use('/api/payments', paymentRoutes);