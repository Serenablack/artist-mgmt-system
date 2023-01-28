import axios from "axios";
import Cookies from "js-cookie";
export const getUser = async (token) => {
  try {
    const response = await axios.get(`api/users`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(`api/user`, {
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createPageUser = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.post(`api/users`, {
        method: "POST",
        data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const editUser = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.put(`/api/users/${data.id}`, {
        method: "PUT",
        data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};
