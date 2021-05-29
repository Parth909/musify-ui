import { SET_ARTIST, ARTIST_TOP_TRACKS } from "../actions/types";

const initialState = {
  artist: null,
  artistTopTracks: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ARTIST:
      return {
        ...state,
        artist: action.artist,
      };
    case ARTIST_TOP_TRACKS:
      return {
        ...state,
        artistTopTracks: action.artistTopTracks,
      };
    default:
      return state;
  }
}
