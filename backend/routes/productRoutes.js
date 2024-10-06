// Import express to use the router functionality
import express from "express";
import checkObjectId from "../middleware/checkObjectId.js";

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
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

// Export the router to use in server.js
export default router;
