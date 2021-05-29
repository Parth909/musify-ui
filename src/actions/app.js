import {
  SET_TOKEN,
  SET_SPOTIFY,
  SET_USER,
  SET_PLAYLISTS
} from './types';

export const setToken = (token) => async dispatch => {
  dispatch({
    type: SET_TOKEN,
    token: token
  })
}

export const setSpotify = (spotify) => async dispatch => {
  dispatch({
    type: SET_SPOTIFY,
    spotify: spotify
  })
}

export const setUser = (user) => async dispatch => {
  dispatch({
    type: SET_USER,
    user: user
  });
}

export const setPlaylists = (playlists) => async dispatch => {
  dispatch({
    type: SET_PLAYLISTS,
    playlists: playlists
  })
}