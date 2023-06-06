const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PostController = {
  getAllposts: async (req, res) => {
    try {
      const post = await prisma.post.findMany();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: { post_id: parseInt(id) },
      });

      if (!post) {
        res.status(404).json({ error: "post not found" });
      } else {
        res.json(post);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createPost: async (req, res) => {
    try {
      const { post_body, user_id } = req.body;
      const post = await prisma.post.create({
        data: {
          post_body,
          // user_id,
        },
      });
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { post_body } = req.body;
      const post = await prisma.post.update({
        where: { post_id: parseInt(id) },
        data: {
          post_body,
          created_on: new Date(), // Set the updated time to the current timestamp
        },
      });
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.post.delete({
        where: { post_id: parseInt(id) },
      });
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = { PostController };
