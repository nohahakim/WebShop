// Import express to use the router functionality
import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get("/top", getTopProducts);

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

// Export the router to use in server.js
export default router;
