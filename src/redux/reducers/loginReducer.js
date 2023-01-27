import { getUser } from "@/services/userService";
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "@services/loginService";

const loginSlice = createSlice({
  name: "loggedUser",
  initialState: null,
  reducers: {
    initUser(state, action) {
      return action.payload;
    },
  },
});
export const { initUser } = loginSlice.actions;

export const login = (userInLocal) => {
  return async (dispatch) => {
    const logged = loginUser(userInLocal.userFound);

    dispatch(initUser(userInLocal));
  };
};
export default loginSlice.reducer;
