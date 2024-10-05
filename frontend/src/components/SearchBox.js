// SearchBox.js

import React, { useState } from "react"; // Import React and useState hook
import { Form, Button } from "react-bootstrap"; // Import Form and Button from React Bootstrap
import { useParams, useNavigate } from "react-router-dom"; // Import hooks from React Router

const SearchBox = () => {
  const navigate = useNavigate(); // Create navigate function
  const { keyword: urlKeyword } = useParams(); // Extract keyword from URL
  const [keyword, setKeyword] = useState(urlKeyword || ""); // Create keyword state

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (keyword.trim()) {
      // If there's a keyword after trimming whitespace
      navigate(`/search/${keyword}`); // Redirect to the search results page with the keyword
    } else {
      navigate("/"); // If no keyword, redirect to the home page
    }

    setKeyword(""); // Clear the search box after submission
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
