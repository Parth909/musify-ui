import {
  SET_PLAYLIST_TRACKS
} from '../actions/types'

const initialState = {
  playlist_tracks:null
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_PLAYLIST_TRACKS:
      return {
        ...state,
        playlist_tracks: action.playlist_tracks
      }
    default:
      return state
  }
}