import {
  SET_ITEM,
  SET_PLAYING_STATE
} from '../actions/types'; 

const initialState = {
  music_item:null,
  music_playingState:false
}

export default function(state = initialState, action){
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        music_item: action.music_item
      }
    case SET_PLAYING_STATE:
      return {
        ...state,
        music_playingState: action.music_playingState
      }
    default:
      return state
  }
}