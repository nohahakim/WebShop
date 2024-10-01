import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
export { protect, admin };

// In this snippet, we define two middleware functions: protect and admin. The protect middleware function is used to authenticate users by verifying the JWT token stored in the HTTP-only cookie. The admin middleware function is used to authorize users with admin privileges for specific actions.
// The protect middleware function takes a request, response, and next function as arguments. It extracts the JWT token from the request cookies and verifies the token using the jwt.verify method from the jsonwebtoken package. If the token is valid, the decoded payload containing the user ID is stored in the req.user property. The user ID is used to find the user in the database, and the user object is stored in the req.user property for authentication purposes.
// The admin middleware function checks if the user is authenticated and has admin privileges based on the isAdmin field in the user object. If the user is an admin, the next function is called to proceed to the next middleware or route handler. If the user is not an admin, an error message is returned with a status code of 401 (Unauthorized).
// These middleware functions are used in the routes to protect and authorize access to specific routes and actions. The protect middleware authenticates users, while the admin middleware authorizes users with admin privileges. By using these middleware functions, we can secure the application and restrict access to certain routes and functionalities based on user roles and permissions.
// Overall, the protect and admin middleware functions play a crucial role in securing the application and implementing user authentication and authorization mechanisms. They help protect sensitive data, prevent unauthorized access, and ensure that only authenticated and authorized users can access protected routes and perform specific actions.
