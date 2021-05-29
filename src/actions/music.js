import {
  SET_ITEM,
  SET_PLAYING_STATE
} from './types'; 

export const setPlayingItem = (res) => async dispatch => {
  dispatch({
    type: SET_ITEM,
    music_item: res
  })
}

export const setPlayingState = (res) => async dispatch => {
  dispatch({
    type: SET_PLAYING_STATE,
    music_playingState: res
  })
}