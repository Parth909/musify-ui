import { combineReducers } from "redux";
import app from "./app";
import home from "./home";
import search from "./search";
import body from "./body";
import music from "./music";
import artist from "./artist";

export default combineReducers({
  app,
  home,
  search,
  body,
  music,
  artist,
});
