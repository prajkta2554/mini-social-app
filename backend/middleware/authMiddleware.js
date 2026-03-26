const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // ❌ Token nahi tar
    if (!authHeader) {
      return res.status(401).json("No token, access denied");
    }

    // 🔐 Bearer token split
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json("Invalid token format");
    }

    // ✅ Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, username }

    next();
  } catch (err) {
    return res.status(401).json("Invalid or expired token");
  }
};
