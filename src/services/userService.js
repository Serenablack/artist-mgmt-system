import axios from "axios";
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
