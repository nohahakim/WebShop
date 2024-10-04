// frontend/src/screens/admin/ProductListScreen.js

import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product")) {
      try {
        await createProduct().unwrap();
        refetch();
        toast.success("Product created successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>

          {loadingCreate && <Loader />}
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/product/${product._id}/edit`}
                    variant="light"
                    className="btn-sm mx-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
