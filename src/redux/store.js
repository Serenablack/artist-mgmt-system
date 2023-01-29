import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./reducers/artistReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    loggedUser: loginReducer,
    artist: artistReducer,
  },
});

export default store;
