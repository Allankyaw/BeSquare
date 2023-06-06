require("dotenv").config();
const express = require("express");
const cors = require("cors");

const user = require("./routers/user");
const post = require("./routers/post");
const seed = require("./routers/seed");

const app = express();
app.use(cors());
app.use(express.json()); // converts to something ur express can read
app.use(express.urlencoded({ extended: false })); // you need L8-10 in all ur express

// connectDB();

app.use("/api", user);
app.use("/api", post);
app.use("/api", seed);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
