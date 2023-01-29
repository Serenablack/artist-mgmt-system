import { createSlice } from "@reduxjs/toolkit";
import { createArt, getArtist } from "@/services/artistService";
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
  },
});
export const { initArtists, addArtist } = artistSlice.actions;

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

export default artistSlice.reducer;
