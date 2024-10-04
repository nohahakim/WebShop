// Import express to use the router functionality
import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

// Export the router to use in server.js
export default router;
