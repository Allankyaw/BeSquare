const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await prisma.user.findFirst({
      where: { user_email },
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        msg: "Email or password is incorrect",
      });
    }

    const passwordMatch = await bcrypt.compare(user_password, user.hash);
    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        msg: "Email or password is incorrect",
      });
    }

    const payload = {
      id: user.user_id,
      email: user.user_email,
      role: user.is_admin ? "admin" : "user",
      // Include any additional fields you want to include in the payload
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { user_id: parseInt(id) },
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const { user_name, user_email, user_password } = req.body;

      // Hash the password
      console.log("user_password:", user_password);
      const hash = await bcrypt.hash(user_password, 12);
      // is using a default salt value of 12 provided by bcrypt.
      // const salt = await bcrypt.genSalt(10);
      // const hash = await bcrypt.hash(user_password, salt);
      // explicitly generates a salt value using bcrypt.genSalt() with a cost factor of 10.

      const user = await prisma.user.create({
        data: {
          user_name,
          user_email,
          hash,
        },
      });

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_name, user_email, user_password } = req.body;

      let hash;
      if (user_password) {
        const salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(user_password, salt);
      }

      const user = await prisma.user.update({
        where: { user_id: parseInt(id) },
        data: {
          user_name,
          user_email,
          hash,
          user_aboutme: req.body.user_aboutme || undefined, // Make user_aboutme optional
          is_admin: req.body.is_admin || undefined, // Make is_admin optional
        },
      });

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: { user_id: parseInt(id) },
      });

      res.json({ message: "User deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = { UserController, login };
