import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "@services/loginService";
import Cookies from "js-cookie";

const loginSlice = createSlice({
  name: "loggedUser",
  initialState: { id: null },
  reducers: {
    initUser(state, action) {
      return action.payload;
    },
  },
});
export const { initUser } = loginSlice.actions;

export const logUser = () => {
  return async (dispatch) => {
    const userLocal = JSON.parse(Cookies.get("userLocal"));
    if (Object.keys(userLocal).length !== 0) {
      const user = userLocal?.userFound;
      dispatch(initUser(user));
    }
  };
};
export default loginSlice.reducer;
