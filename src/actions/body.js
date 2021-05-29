import {
  SET_PLAYLIST_TRACKS
} from './types'

export const setPlayTracks = (data) => async dispatch => {
  dispatch({
    type:SET_PLAYLIST_TRACKS,
    playlist_tracks: data
  })
}