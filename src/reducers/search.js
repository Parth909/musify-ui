import {SET_SEARCH_RESULT} from '../actions/types';

const initialState = {
  search_result: null
}

export default function(state=initialState, action){
  switch(action.type){
    case SET_SEARCH_RESULT:
      return {
        ...state,
        search_result: action.search_result
      }
    default:
      return state;
  }
}