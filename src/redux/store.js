import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    loggedUser: loginReducer,
  },
});

export default store;
