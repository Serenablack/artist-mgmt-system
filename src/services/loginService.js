import axios from "axios";

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`api/login`, {
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
