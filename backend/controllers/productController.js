import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = process.env.PAGINATION_LIMIT || 8; // Number of products per page
    const page = Number(req.query.pageNumber) || 1;

    // Extract the keyword from the query parameters
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword, // Use regex for partial matching
            $options: "i", // Case-insensitive
          },
        }
      : {};

    // Get the total count of products matching the keyword
    const count = await Product.countDocuments({ ...keyword });

    // Fetch the products with pagination and keyword filtering
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" }); // Send success message
  } else {
    res.status(404);
    throw new Error("Product not found"); // Handle product not found
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body; // Extract rating and comment from request body

  const product = await Product.findById(req.params.id); // Find the product by ID

  if (product) {
    // Check if the user has already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400); // Bad request status
      throw new Error("Product already reviewed");
    }

    // Create a new review object
    const review = {
      name: req.user.name, // User's name
      rating: Number(rating), // Rating (ensure it's a number)
      comment, // Comment text
      user: req.user._id, // User's ID
    };

    product.reviews.push(review); // Add the review to the product's reviews array
    product.numReviews = product.reviews.length; // Update the total number of reviews

    // Calculate the product's average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save(); // Save the updated product

    res.status(201).json({ message: "Review added" }); // Send success response
  } else {
    res.status(404); // Not found status
    throw new Error("Product not found");
  }
});
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
