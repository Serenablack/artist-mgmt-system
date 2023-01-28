import { createSlice } from "@reduxjs/toolkit";
import {
  createPageUser,
  deleteUser,
  editUser,
  getUser,
} from "@/services/userService";
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
    updateUser(state, action) {
      return state?.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    removeUser(state, action) {
      return state.filter((user) => user.id !== action.payload.id);
    },
  },
});
export const { initUsers, addUser, updateUser, removeUser } = userSlice.actions;

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

export const editOld = ({
  id,
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
    const userEdited = await editUser({
      id,
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      gender,
      address,
    });

    dispatch(updateUser(userEdited));
  };
};
export const delUser = (user) => {
  return async (dispatch) => {
    await dispatch(removeUser(user));
    const result = deleteUser(user);
  };
};

export default userSlice.reducer;
