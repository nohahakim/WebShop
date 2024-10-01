// src/screens/LoginScreen.js

import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit"); // Placeholder
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        {/* Email field */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state
          ></Form.Control>
        </Form.Group>

        {/* Password field */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state
          ></Form.Control>
        </Form.Group>

        {/* Submit button */}
        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>
      </Form>

      {/* Register link */}
      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
