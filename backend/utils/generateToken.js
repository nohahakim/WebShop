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
// In this snippet, we define a function called generateToken that takes a user ID and a response object as arguments. The function generates a JWT token using the jwt.sign method from the jsonwebtoken package.

// The token is signed with the user ID and a secret key stored in the environment variables (process.env.JWT_SECRET). We set the token to expire in 30 days using the expiresIn option.

// Finally, we set the JWT token as an HTTP-only cookie using the res.cookie method from the express library. The cookie is configured with the httpOnly option set to true to ensure that it is accessible only by the web server.

// We also set the secure option to true in production to ensure that the cookie is sent over HTTPS. The sameSite option is set to strict to prevent CSRF attacks, and the maxAge option is set to 30 days to specify the cookie's expiration time.

// This function is used in the userController.js file to generate a JWT token after successfully registering a user. The token is then set as an HTTP-only cookie in the response to authenticate the user for subsequent requests.

// By setting the JWT token as an HTTP-only cookie, we ensure that it is secure and protected from client-side JavaScript code, reducing the risk of cross-site scripting (XSS) attacks. This approach enhances the security of the authentication mechanism in the application.

// Overall, the generateToken function plays a crucial role in generating and securely storing JWT tokens for user authentication in the application. It demonstrates best practices for handling authentication tokens and enhancing the security of user authentication processes.
