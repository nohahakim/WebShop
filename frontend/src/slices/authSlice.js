import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;

      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// In this snippet, we define an authSlice using the createSlice function from the @reduxjs/toolkit package. The authSlice contains the initial state, reducers, and actions for managing user authentication and credentials in the Redux store.
// The initial state includes a userInfo field that is initialized with the user information stored in the local storage. If the user information is present in the local storage, it is parsed and stored in the userInfo field; otherwise, it is set to null.
// The setCredentials reducer updates the userInfo field in the state with the user information passed in the action payload. It also stores the user information in the local storage to persist the user's authentication state across page reloads.
// The logout reducer clears the userInfo field in the state and removes the user information from the local storage to log out the user and reset the authentication state.
// The setCredentials and logout actions are exported from the authSlice to be dispatched in the application to set user credentials and log out the user, respectively.
// The authSlice reducer is exported as the default export from the authSlice file to be combined with other reducers in the Redux store configuration.
// This authSlice is used to manage user authentication and credentials in the Redux store by setting user information and logging out the user. It provides a structured way to handle user authentication actions and state updates in the application.
// By using the authSlice, we can maintain the user's authentication state across components and pages, handle user login and logout actions, and persist user credentials in the local storage. The slice encapsulates the logic for managing user authentication in a centralized manner.
// Overall, the authSlice plays a crucial role in managing user authentication state and credentials in the Redux store, enabling seamless user authentication and authorization features in the application. It simplifies the process of handling user authentication actions and state updates in a predictable and efficient way.
