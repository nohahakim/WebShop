import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId }, // Payload: user ID
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: "30d" } // Token expires in 30 days
  );

  // Set the JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Accessible only by the web server
    secure: process.env.NODE_ENV !== "development", // Send over HTTPS in production

    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expires in 30 days (in milliseconds)
  });
};

export default generateToken;
