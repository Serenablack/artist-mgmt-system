import axios from "axios";

export const createUser = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`api/user`, {
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
