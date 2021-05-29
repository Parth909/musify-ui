import {SET_SEARCH_RESULT} from './types'

export const setSearchResult = (res) => async dispatch => {
  dispatch({
    type:SET_SEARCH_RESULT,
    search_result: res
  })
}