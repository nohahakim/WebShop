import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems, // Array of order items
    shippingAddress, // Shipping address object
    paymentMethod, // Payment method string
    itemsPrice, // Total price of items
    taxPrice, // Tax amount
    shippingPrice, // Shipping cost
    totalPrice, // Total order price
  } = req.body;

  // Check if order items are present
  if (orderItems && orderItems.length === 0) {
    res.status(400); // Bad Request
    throw new Error("No order items");
  } else {
    // Prepare order items by adding the product field and removing _id
    const preparedOrderItems = orderItems.map((item) => ({
      ...item, // Spread existing item properties
      product: item._id, // Set product field to item's ID
      _id: undefined, // Remove _id field to prevent conflicts
    }));

    const order = new Order({
      orderItems: preparedOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
// Update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  if (order) {
    // Update order payment status
    order.isPaid = true;
    order.paidAt = Date.now(); // Set paidAt to current date and time
    order.paymentResult = {
      id: req.body.id, // PayPal payment ID
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // Save the updated order
    const updatedOrder = await order.save();

    // Respond with the updated order
    res.status(200).json(updatedOrder);
  } else {
    // Order not found
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};