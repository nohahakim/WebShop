import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function LoginScreen() {
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state

  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate
  const { search } = useLocation(); // Initialize location

  const [login, { isLoading }] = useLoginMutation(); // Initialize login mutation and loading state

  const { userInfo } = useSelector((state) => state.auth); // Get userInfo from Redux state
  const searchParams = new URLSearchParams(search); // Parse query parameters
  const redirect = searchParams.get("redirect") || "/"; // Determine redirect path

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Redirect if logged in
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await login({ email, password }).unwrap(); // Call login mutation
      dispatch(setCredentials(res)); // Update Redux state
      navigate(redirect); // Redirect after login
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Display error message
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading} // Disable button if loading
        >
          Sign In
        </Button>
        {isLoading && <Loader />} {/* Show loader while loading */}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"} // Preserve redirect parameter
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
