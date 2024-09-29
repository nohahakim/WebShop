const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // Handle any errors and pass them to the next middleware
};
// Export the asyncHandler to use in routes
export default asyncHandler;
// Async Handler Function: This middleware function wraps asynchronous route handlers to catch errors and pass them to Express's error-handling middleware.
// Simplifies Error Handling: Eliminates the need for try-catch blocks in every asynchronous route handler.
