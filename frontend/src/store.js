import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Adding the API slice reducer
    // Other reducers can be added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adding the API slice middleware
  devTools: true, // Enabling Redux DevTools
});

export default store;
