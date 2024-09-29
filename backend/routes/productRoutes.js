// Import express to use the router functionality
import express from "express";

import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
// Export the router to use in server.js
export default router;
