// src/components/FormContainer.js

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// FormContainer component to center forms
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children} {/* Render child components */}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
