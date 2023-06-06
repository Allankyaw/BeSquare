const express = require("express");
const router = express.Router();
const { seedData } = require("../controllers/seed");

// Define routes
router.get("/seed", seedData);
// Define other routes

module.exports = router;
