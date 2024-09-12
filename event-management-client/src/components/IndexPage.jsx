import React from 'react';
import { Link } from 'react-router-dom';
import './IndexPage.css'; // Importing the CSS for styling

const IndexPage = () => {
  return (
    <div className="index-page">
      <header className="header">
        <h1>Welcome to Event Management System</h1>
      </header>
      <div className="main-content">
        <Link to="/login" className="button">Login</Link>
        {/* Additional navigation links can be added here */}
      </div>
    </div>
  );
};

export default IndexPage;
