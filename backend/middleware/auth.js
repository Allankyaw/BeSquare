const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ status: "error", msg: "not authorized1" });
  }

  //removing the Bearer inside Authorization header
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "not authorized2" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }
};

module.exports = { auth };
