import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js"; // Import the functions from the controller
import { protect, admin } from "../middleware/authMiddleware.js"; // Import the middleware functions

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders); // Route to create a new order and get all orders

router.route("/myorders").get(protect, getMyOrders); // Route to get logged in user orders

router.route("/:id").get(protect, getOrderById); // Route to get order by ID

router.route("/:id/pay").put(protect, updateOrderToPaid); // Route to update order to paid

router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered); // Route to update order to delivered

export default router; // Export the router
