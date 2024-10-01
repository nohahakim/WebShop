// src/slices/usersApiSlice.js

import { apiSlice } from "./apiSlice"; // Base API slice
import { USERS_URL } from "../constants"; // Users API URL
import { logout } from "./authSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, // Endpoint for login
        method: "POST", // HTTP method
        body: data, // Send email and password
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: USERS_URL, // Endpoint for register
        method: "POST", // HTTP method
        body: userData, // Send email and password
      }),
      logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`, // Endpoint for logout
          method: "POST", // HTTP method
        }),
      }),
    }),
  }),
});

// Export the auto-generated hook for the login mutation
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
