import axios from "axios";
import Cookies from "js-cookie";
export const getArtist = async (token) => {
  try {
    const response = await axios.get(`/api/artists`, {
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

export const createArt = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.post(`/api/artists`, {
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

export const editArtist = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.put(`/api/artists/${data.id}`, {
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
export const deleteArtist = async (data) => {
  try {
    if (JSON.parse(Cookies.get("userLocal"))) {
      const token = JSON.parse(Cookies.get("userLocal")).token;
      const response = await axios.delete(`/api/artists/${data.id}`, {
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
