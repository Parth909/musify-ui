import { SET_ARTIST, ARTIST_TOP_TRACKS } from "./types";

export const setArtist = (data) => (dispatch) => {
  dispatch({
    type: SET_ARTIST,
    artist: data,
  });
};

export const setArtistTopTracks = (data) => (dispatch) => {
  dispatch({
    type: ARTIST_TOP_TRACKS,
    artistTopTracks: data,
  });
};
