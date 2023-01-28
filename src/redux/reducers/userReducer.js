import { createSlice } from "@reduxjs/toolkit";
import { createPageUser, createUser, getUser } from "@/services/userService";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initUsers(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      return [...state, action.payload];
    },
  },
});
export const { initUsers, addUser } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const user = JSON.parse(Cookies.get("userLocal"));
    const users = await getUser(user?.token);
    dispatch(initUsers(users));
  };
};

export const createNew = ({
  firstName,
  lastName,
  email,
  password,
  phone,
  dob,
  gender,
  address,
}) => {
  return async (dispatch) => {
    const userCreated = await createPageUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      gender,
      address,
    });
    dispatch(addUser(userCreated));
  };
};

export default userSlice.reducer;
