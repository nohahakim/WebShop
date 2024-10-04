import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants.js";

// Inject order endpoints into the base API slice
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a new order
    createOrder: builder.mutation({
      // Define the query parameters
      query: (order) => ({
        // Set the URL to the orders endpoint
        url: ORDERS_URL,
        // Specify the HTTP method
        method: "POST",
        // Include the order data in the request body
        body: { ...order },
      }),
    }),

    // Get Order Details Query
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`, // Endpoint to fetch order details
        method: "GET", // HTTP method (GET is default, so this line is optional)
      }),
      keepUnusedDataFor: 5, // Keep data in cache for 5 seconds
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { details },
      }),
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5, // Cache control
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5, // Cache data for 5 seconds
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
      // to refresh order data after mutation.

      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
