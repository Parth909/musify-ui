import {
  SET_NEW_RELS,
  SET_NEW_FPS,
  SET_NEW_CATS,
  SET_CAT_PLAY_ID,
  CAT_PLAYLIST,
  SET_FOLLOWED_ARTISTS,
} from "../actions/types";

const initialState = {
  new_rels: null,
  new_fps: null,
  new_cats: null,
  // since Rows are inside Home & the no of action is only 1 from Row
  // thf managing it in home itself
  cat_playid: "party",
  cat_play: null,
  followed_artists: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_RELS:
      return {
        ...state,
        new_rels: action.new_rels,
      };
    case SET_NEW_FPS:
      return {
        ...state,
        new_fps: action.new_fps,
      };
    case SET_NEW_CATS:
      return {
        ...state,
        new_cats: action.new_cats,
      };
    case SET_CAT_PLAY_ID:
      return {
        ...state,
        cat_playid: action.cat_playid,
      };
    case CAT_PLAYLIST:
      return {
        ...state,
        cat_play: action.cat_play,
      };
    case SET_FOLLOWED_ARTISTS:
      return {
        ...state,
        followed_artists: action.followed_artists,
      };
    default:
      return state;
  }
}
