import { createSlice } from "@reduxjs/toolkit";
import {
  createArt,
  deleteArtist,
  editArtist,
  getArtist,
} from "@/services/artistService";
import Cookies from "js-cookie";

const artistSlice = createSlice({
  name: "artist",
  initialState: null,
  reducers: {
    initArtists(state, action) {
      return action.payload;
    },
    addArtist(state, action) {
      return [...state, action.payload];
    },
    updateArtist(state, action) {
      return state?.map((artist) => {
        if (artist.id === action.payload.id) {
          return action.payload;
        }
        return artist;
      });
    },
    removeArtist(state, action) {
      return state.filter((artist) => artist.id !== action.payload.id);
    },
  },
});
export const { initArtists, addArtist, updateArtist, removeArtist } =
  artistSlice.actions;

export const initializeArtists = () => {
  return async (dispatch) => {
    const user = JSON.parse(Cookies.get("userLocal"));
    const artists = await getArtist(user?.token);
    dispatch(initArtists(artists));
  };
};

export const createNew = ({
  name,
  dob,
  gender,
  address,
  firstReleaseYear,
  noOfAlbumsReleased,
}) => {
  return async (dispatch) => {
    const artistNew = await createArt({
      name,
      dob,
      gender,
      address,
      firstReleaseYear,
      noOfAlbumsReleased,
    });
    dispatch(addArtist(artistNew));
  };
};

export const editOld = ({
  id,
  name,
  dob,
  gender,
  address,
  firstReleaseYear,
  noOfAlbumsReleased,
}) => {
  return async (dispatch) => {
    const artistEdited = await editArtist({
      id,
      name,
      dob,
      gender,
      address,
      firstReleaseYear,
      noOfAlbumsReleased,
    });

    dispatch(updateArtist(artistEdited));
  };
};

export const delArtist = (artist) => {
  return async (dispatch) => {
    await dispatch(removeArtist(artist));
    const result = deleteArtist(artist);
  };
};

export default artistSlice.reducer;
