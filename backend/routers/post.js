const express = require("express");
const router = express.Router();
const { PostController } = require("../controllers/post");
const { auth } = require("../middleware/auth");

// Define routes
router.get("/posts", PostController.getAllposts);
router.get("/posts/:id", PostController.getPostById);
router.put("/posts", PostController.createPost);
router.post("/posts/:id", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);
// Define other routes

module.exports = router;
