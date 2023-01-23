import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "@/services/userService";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initUser(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      return { ...action.payload };
    },
  },
});
export const { initUser, addUser } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("authorizedUser"));
    console.log(user.token);
    const { userFound, token } = user;
    const users = await getUser(token);
    console.log(users);
    dispatch(initUser(users));
  };
};

export const createNew = (token) => {
  return async (dispatch) => {
    dispatch(addUser(response));
  };
};

export default userSlice.reducer;
