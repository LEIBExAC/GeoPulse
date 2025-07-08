const { JWT_SECRET } = require("./keys");
const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId, user) => {
  const token = jwt.sign(
    {
      userId,
      role: user.role,
      isVerified: user.isVerified,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    httpOnly: true, // Ensure the cookie is only accessible via HTTP requests, not client-side JS   prev false
    secure: true, // Set to false for development over HTTP                                         pev false
    sameSite: "None", // Helps with cross-origin requests while keeping some protection             lax
  });

  return token; // Return the token for further use
};

module.exports = generateTokenAndSetCookie;
