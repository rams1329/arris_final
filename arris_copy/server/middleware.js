// middleware.js

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // Check if user is logged in (You can modify this based on your authentication logic)
    if (req.session && req.session.isAuthenticated) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
      res.redirect('/login'); // User is not authenticated, redirect to login page
    }
  };
  
  module.exports = {
    isAuthenticated,
  };
  