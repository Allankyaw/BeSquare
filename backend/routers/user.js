const express = require("express");
const router = express.Router();
const { UserController, login } = require("../controllers/user");
const { auth } = require("../middleware/auth");
const checkValid = require("../middleware/checkValid");
// const validateLogin = require("../validator/login");

// Define routes
router.get("/users", auth, UserController.getAllUsers);
router.get("/users/:id", auth, UserController.getUserById);
router.put("/register", UserController.createUser); //register
router.post("/users/:id", auth, UserController.updateUser);
router.delete("/users/:id", auth, UserController.deleteUser);
router.post("/login", checkValid, login);
// Define other routes

module.exports = router;
