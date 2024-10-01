// src/slices/usersApiSlice.js

import { apiSlice } from "./apiSlice"; // Base API slice
import { USERS_URL } from "../constants"; // Users API URL

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
  }),
});

// Export the auto-generated hook for the login mutation
export const { useLoginMutation } = usersApiSlice;
