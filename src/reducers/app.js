import {
  SET_TOKEN,
  SET_SPOTIFY,
  SET_USER,
  SET_PLAYLISTS
} from '../actions/types';

const initialState = {
  device_id:null,
  token:null,
  spotify:null,
  user:null,
  playlists:{}
}

export default function(state=initialState, action){
  switch(action.type){
    case SET_TOKEN:
      localStorage.setItem('token', action.token);
      return{
        ...state,
        token: action.token
      }
    case SET_SPOTIFY:
      return {
        ...state,
        spotify: action.spotify
      }
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists
      }
    default:
      return state
  }
}