const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utility/keys");
const USER = require("../models/user"); // Import the User model

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }

    req.userId = decoded.userId;

    // Fetch user to get role
    const user = await USER.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    req.user = user
    req.role = user.role; // Set role in req
    next();

  } catch (error) {
    console.error("Error in verifyToken:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = verifyToken;
