import express from "express"; // Import express to use the router functionality

const notFound = (req, res, next) => {
  // Create a new error object with a 404 status code
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set the status code to 404
  next(error); // Pass the error to the next middleware
};

const errorHandler = (err, req, res, next) => {
  // eslint-disable-line
  // Get the status code from the error object or set it to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message; // Set the message to the error message

  res.status(statusCode).json({
    // Send a JSON response with the error message
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
export { notFound, errorHandler };
