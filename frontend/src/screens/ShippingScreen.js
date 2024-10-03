import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"; // Import Form and Button components
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { useNavigate } from "react-router-dom"; // Import navigation hook
import FormContainer from "../components/FormContainer"; // Custom container component
import { saveShippingAddress } from "../slices/cartSlice"; // Import action to save shipping address
import CheckoutSteps from "../components/CheckoutSteps"; // Import CheckoutSteps component
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart); // Get cart state from Redux store
  const { shippingAddress } = cart; // Destructure shippingAddress from cart state
  const [address, setAddress] = useState(shippingAddress?.address || ""); // Address state
  const [city, setCity] = useState(shippingAddress?.city || ""); // City state
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  ); // Postal code state
  const [country, setCountry] = useState(shippingAddress?.country || ""); // Country state
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(saveShippingAddress({ address, city, postalCode, country })); // Save shipping address
    navigate("/payment"); // Navigate to payment screen
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 /> {/* Checkout steps */}
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)} // Update address state
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)} // Update city state
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)} // Update postalCode state
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)} // Update country state
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
