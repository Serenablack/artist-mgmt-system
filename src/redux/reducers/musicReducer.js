import { createSlice } from "@reduxjs/toolkit";
import {
  createMusic,
  deleteMusic,
  editMusic,
  getMusic,
} from "@/services/musicService";
import Cookies from "js-cookie";

const musicSlice = createSlice({
  name: "music",
  initialState: [],
  reducers: {
    initMusic(state, action) {
      return action.payload;
    },
    addMusic(state, action) {
      return [...state, action.payload];
    },
    updateMusic(state, action) {
      return state?.map((music) => {
        if (music.id === action.payload.id) {
          return action.payload;
        }
        return music;
      });
    },
    removeMusic(state, action) {
      return state.filter((music) => music.id !== action.payload.id);
    },
  },
});
export const { initMusic, addMusic, updateMusic, removeMusic } =
  musicSlice.actions;

export const initializeMusic = (id) => {
  return async (dispatch) => {
    const user = JSON.parse(Cookies.get("userLocal"));
    const music = await getMusic(user?.token);

    const reqMusic = music.filter((mus) => {
      return mus.artistId === Number(id);
    });

    dispatch(initMusic(reqMusic));
  };
};

export const createNew = ({ title, albumName, genre, artistId }) => {
  return async (dispatch) => {
    const musicNew = await createMusic({
      title,
      albumName,
      genre,
      artistId,
    });
    dispatch(addMusic(musicNew));
  };
};

export const editOld = ({ id, title, albumName, genre, artist, artistId }) => {
  return async (dispatch) => {
    const musicEdited = await editMusic({
      id,
      title,
      albumName,
      genre,
    });

    dispatch(updateMusic(musicEdited));
  };
};

export const delMusic = (music) => {
  return async (dispatch) => {
    await dispatch(removeMusic(music));
    const result = deleteMusic(music);
  };
};

export default musicSlice.reducer;
