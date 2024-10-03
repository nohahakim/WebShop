import React, { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom"; // For routing and accessing URL parameters
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"; // UI components
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice"; // Query hook
import Loader from "../components/Loader"; // Loading spinner
import Message from "../components/Message"; // Alert messages

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    isError,
  } = useGetOrderDetailsQuery(orderId);
  // Fetch PayPal client ID
  const {
    data: paypalData,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  // PayPal script reducer
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Load PayPal script when client ID is available
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypalData.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypalData.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        loadPayPalScript();
      }
    }
  }, [errorPayPal, loadingPayPal, paypalData, order, paypalDispatch]);

  // Mutation for paying the order
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  // Payment success handler
  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      await payOrder({ orderId: orderId, details });
      toast.success("Payment successful");
    } catch (error) {
      toast.error("Payment could not be processed");
    }
  };

  // Payment error handler
  const onError = (err) => {
    toast.error(err.message);
  };

  return isLoading ? (
    // Display a loader while fetching data
    <Loader />
  ) : error ? (
    // Display an error message if fetching data fails
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    // Display the order details once data is fetched
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Shipping Information */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Noha:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            {/* Payment Method */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
          {/* Order Items */}
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your order is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          {" "}
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              {/* Items Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Shipping Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Tax Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Total Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!order.isPaid && (
                  <>
                    {isPending ? (
                      <Loader />
                    ) : (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.totalPrice,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    )}
                  </>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Pay Order Placeholder */}
                <p>Pay Order Button will go here</p>
              </ListGroup.Item>
              {/* Mark as Delivered Placeholder (Admin Only) */}
              <ListGroup.Item>
                {/* Mark as Delivered Placeholder */}
                <p>Mark as Delivered Button will go here (Admin only)</p>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
