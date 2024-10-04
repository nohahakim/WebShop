import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Hooks for navigation and params
import { Form, Button } from "react-bootstrap"; // UI components
import { toast } from "react-toastify"; // For notifications
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice"; // API hooks
import Loader from "../../components/Loader"; // Loader component
import Message from "../../components/Message"; // Message component
import FormContainer from "../../components/FormContainer"; // Container for the form

const ProductEditScreen = () => {
  const { id: productId } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  // State variables for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  // Fetch product details
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  // Mutation hook for updating the product
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      // Populate the form fields with product data
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        id: productId, // Product ID
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap(); // Unwrap the result
      toast.success("Product updated"); // Show success message
      navigate("/admin/productlist"); // Navigate back to product list
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Show error message
    }
  };
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button
        className="btn btn-light my-3"
        onClick={() => navigate("/admin/productlist")}
      >
        Go Back
      </Button>

      <FormContainer>
        <h1>Edit Product</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update state
              ></Form.Control>
            </Form.Group>

            {/* Price */}
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)} // Update state
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {loadingUpload && <Loader />} {/* Show loader while uploading */}
            </Form.Group>

            {/* Brand */}
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)} // Update state
              ></Form.Control>
            </Form.Group>

            {/* Count In Stock */}
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)} // Update state
              ></Form.Control>
            </Form.Group>

            {/* Category */}
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)} // Update state
              ></Form.Control>
            </Form.Group>

            {/* Description */}
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update state
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
