const adminEmails = ['admin@example.com']; // Example admin email list

const authenticateAdmin = (req, res, next) => {
  const { email } = req.body; // Ensure 'email' is extracted from the request body

  if (adminEmails.includes(email)) {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = authenticateAdmin;
