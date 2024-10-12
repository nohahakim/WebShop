// OrderScreen.js

import { useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypalData,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (
      !errorPayPal &&
      !loadingPayPal &&
      paypalData?.clientId &&
      order &&
      !order.isPaid
    ) {
      const loadPayPalScript = () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypalData.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (!window.paypal) {
        loadPayPalScript();
      }
    }
  }, [
    errorPayPal,
    loadingPayPal,
    paypalData?.clientId,
    order,
    order?.isPaid,
    paypalDispatch,
  ]);

  const createOrder = useCallback(
    (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: { value: order.totalPrice.toFixed(2) },
            },
          ],
        })
        .then((orderID) => orderID);
    },
    [order]
  );

  const onApprove = useCallback(
    (data, actions) => {
      return actions.order.capture().then(async (details) => {
        try {
          await payOrder({ orderId, details }).unwrap();
          refetch();
          toast.success("Order is paid");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      });
    },
    [payOrder, orderId, refetch]
  );

  const onError = useCallback((err) => {
    toast.error(err.message);
  }, []);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Order marked as delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          {/* Shipping Details */}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {`${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* Payment Details */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price.toFixed(2)} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              {/* Summary Details */}
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              {[
                { label: "Items", value: order.itemsPrice },
                { label: "Shipping", value: order.shippingPrice },
                { label: "Tax", value: order.taxPrice },
                { label: "Total", value: order.totalPrice },
              ].map((item, idx) => (
                <ListGroup.Item key={idx}>
                  <Row>
                    <Col>{item.label}</Col>
                    <Col>${item.value.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}

              {/* PayPal Payment */}
              {!order.isPaid && order.paymentMethod === "PayPal" && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </ListGroup.Item>
              )}

              {/* Deliver Order Button for Admin */}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn w-100"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
