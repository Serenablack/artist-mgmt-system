import axios from "axios";
import Cookies from "js-cookie";
export const getMusic = async (token) => {
  try {
    const response = await axios.get(`/api/music`, {
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

export const createMusic = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.post(`/api/music`, {
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

export const editMusic = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.put(`/api/music/${data.id}`, {
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
export const deleteMusic = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.delete(`/api/music/${data.id}`, {
        method: "DELETE",
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
