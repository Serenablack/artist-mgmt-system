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

export const initializeUsers = (authorizeUser) => {
  return async (dispatch) => {
    const { userFound, token } = authorizeUser;
    const users = await getUser(authorizeUser.token);
    dispatch(addUser(users));
  };
};

export const createNew = (token) => {
  return async (dispatch) => {
    dispatch(addUser(response));
  };
};

export default userSlice.reducer;
