import {
  SET_NEW_RELS,
  SET_NEW_FPS,
  SET_NEW_CATS,
  SET_CAT_PLAY_ID,
  CAT_PLAYLIST,
  SET_FOLLOWED_ARTISTS,
} from "./types";

export const setNewRels = (res) => (dispatch) => {
  dispatch({
    type: SET_NEW_RELS,
    new_rels: res,
  });
};

export const setNewFps = (res) => (dispatch) => {
  dispatch({
    type: SET_NEW_FPS,
    new_fps: res,
  });
};

export const setNewCats = (res) => (dispatch) => {
  dispatch({
    type: SET_NEW_CATS,
    new_cats: res,
  });
};

export const setCatPlayId = (id) => (dispatch) => {
  dispatch({
    type: SET_CAT_PLAY_ID,
    cat_playid: id,
  });
};

export const setCatPlaylist = (res) => (dispatch) => {
  dispatch({
    type: CAT_PLAYLIST,
    cat_play: res,
  });
};

export const setFollowedArtists = (res) => (dispatch) => {
  dispatch({
    type: SET_FOLLOWED_ARTISTS,
    followed_artists: res,
  });
};
