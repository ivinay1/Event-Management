import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UserManagement from './components/UserManagement';
import VendorManagement from './components/VendorManagement';
import MembershipManagement from './components/MembershipManagement';
import UserProfile from './components/UserProfile';
import VendorProfile from './components/VendorProfile';
import Cart from './components/Cart';
import OrderStatus from './components/OrderStatus';
import EventManagement from './components/EventManagement';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Reports from './components/Reports';
import PaymentPage from './components/PaymentPage';


function App() {
  const isAuthenticated = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute element={AdminDashboard} isAuthenticated={isAuthenticated} />} />
        <Route path="/admin/users" element={<ProtectedRoute element={UserManagement} isAuthenticated={isAuthenticated} />} />
        <Route path="/admin/vendors" element={<ProtectedRoute element={VendorManagement} isAuthenticated={isAuthenticated} />} />
        <Route path="/admin/memberships" element={<ProtectedRoute element={MembershipManagement} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/profile/:id" element={<ProtectedRoute element={UserProfile} isAuthenticated={isAuthenticated} />} />
        <Route path="/vendor/profile/:id" element={<ProtectedRoute element={VendorProfile} isAuthenticated={isAuthenticated} />} />
        <Route path="/cart" element={<ProtectedRoute element={Cart} isAuthenticated={isAuthenticated} />} />
        <Route path="/orders" element={<ProtectedRoute element={OrderStatus} isAuthenticated={isAuthenticated} />} />
        <Route path="/admin/events" element={<ProtectedRoute element={EventManagement} isAuthenticated={isAuthenticated} />} />
        <Route path="/notifications" element={<ProtectedRoute element={Notifications} isAuthenticated={isAuthenticated} />} />
        <Route path="/messages/:recipientId" element={<ProtectedRoute element={Messages} isAuthenticated={isAuthenticated} />} />
        <Route path="/reports" element={<ProtectedRoute element={Reports} isAuthenticated={isAuthenticated} />} />
        <Route path="/payment" element={<ProtectedRoute element={PaymentPage} isAuthenticated={isAuthenticated} />} />
         {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
