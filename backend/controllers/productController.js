import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// File: controllers/productController.js

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // Destructure product data from the request body
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  // Find the product by ID from the request parameters
  const product = await Product.findById(req.params.id);

  if (product) {
    // Update product fields with new data
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    // Save the updated product to the database
    const updatedProduct = await product.save();

    // Respond with the updated product
    res.json(updatedProduct);
  } else {
    // If product not found, respond with 404 error
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, createProduct, updateProduct };
