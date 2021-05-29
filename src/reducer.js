export const initialState = {
    user: null,
    playlists: {},
    spotify: null,
    discover_weekly: null,
    new_rels: null,
    new_fps:null,
    new_cats:null,
    cat_playid:"party",//the id of playlist set when clicked by the user
    cat_play:null,//the actual playlist of particular category
    search_result:null,
    playing: false,
    item: null,
    // Remove after finished debugging
    // token:"BQAvvtFT3uF249nQW151OFc25nLWztO00dVI5u-rzq9asE6wQSo39kAdTBZhV0pd970GmA5arnhc8fogEh77K4IS7_arKcsTruvH8sPIR0JybZ-IilfsYdEaewofydEeOkiRciq3btmBHBSHa52fAV06eizVxdnU76O4vMEisBmEeFcj"
};

const reducer = (state, action) => {

    switch(action.type){
        case "SET_USER":
            return {
              ...state,
              user: action.user,
            };
      
          case "SET_PLAYING":
            return {
              ...state,
              playing: action.playing,
            };
      
          case "SET_ITEM":
            return {
              ...state,
              item: action.item,
            };
      
          case "SET_DISCOVER_WEEKLY":
            return {
              ...state,
              discover_weekly: action.discover_weekly,
            };
      
          case "SET_NEW_RELS":
            return {
              ...state,
              new_rels: action.new_rels,
            };
          case "SET_NEW_FPS":
            return {
              ...state,
              new_fps:action.new_fps
            }
          case "SET_NEW_CATS":
            return {
              ...state,
              new_cats:action.new_cats
            }

          case "CAT_PLAYLIST":
            return {
              ...state,
              cat_play:action.cat_play
            }

          case "CAT_PLAYLIST_ID":
            return {
              ...state,
              cat_playid:action.cat_playid
            }

          case "SET_SEARCH_RESULT":
            return {
              ...state,
              search_result:action.search_result
            }

          case "SET_TOKEN":
            return {
              ...state,
              token: action.token,
            };
      
          case "SET_SPOTIFY":
            return {
              ...state,
              spotify: action.spotify,
            };
      
          case "SET_PLAYLISTS":
            return {
              ...state,
              playlists: action.playlists,
            };
        default:
            return state;
    }
}

export default reducer;