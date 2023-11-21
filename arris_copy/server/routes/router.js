const express = require("express");
const route = express.Router();
const multer = require("multer");
const { isAuthenticated } = require('../middleware');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
const services = require("../services/render");
const controller = require("../controller/controller");


/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/",isAuthenticated, services.homeRoutes);
route.get("/home",isAuthenticated, services.homeRoutes_home);


/**
 *  @description add users
 *  @method GET /add-user
 */
route.get("/add-user", services.add_user);

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get("/update-user", services.update_user);
route.get("/team", services.teams);

// API
route.post('/api/users', isAuthenticated, upload.single('image'), controller.create);
route.get('/api/users', isAuthenticated, controller.find);
route.put('/api/users/:id', isAuthenticated, controller.update);
route.delete('/api/users/:id', isAuthenticated, controller.delete);
route.post('/search',isAuthenticated,controller.searchCustomers);








route.get('/logout', isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login'); // Redirect to the login page after logout
  });
});







module.exports = route;
