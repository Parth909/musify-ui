import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
// import { useDataLayerValue } from './DataLayer';
// makes it easy to interact with the spotify-web-api
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
// importing the action creators
import {
  setToken,
  setSpotify,
  setUser,
  setPlaylists
} from './actions/app';

const spotify = new SpotifyWebApi();

function App({setToken, setSpotify, setUser, setPlaylists, app:{token, user}}) {

  // pulling data from data layer , used to update or dispatch actions
  // const [{ user, token }, dispatch] = useDataLayerValue();


  useEffect(()=>{
    // exporting from spotify.js
    const hashObj = getTokenFromUrl();
    window.location.hash = "";//clearing the url

    const _token = hashObj.access_token;

    if(_token){

      // Set the token in the local storage
      setToken(_token);

      // Set the spotify so that it can be used anywhere in the app
      setSpotify(spotify);
      console.log(spotify)

      // SWA
      spotify.setAccessToken(_token);

      // returns a promise
      spotify.getMe().then(user=>{
        console.log("Person", user);

        // adding it in the redux-store
        setUser(user);
      });

      spotify.getUserPlaylists().then((playlists)=>{
        // adding the user playlist in the redux store
        setPlaylists(playlists);
      });

    }

  }, [token]);

  console.log(token)

  return (
    <div className="app">
      {
        // doing normally without context & reducer
        token ? (
          <Player spotify={spotify}/>
        ) : (
          // Login
          <Login/>
        )
      }
      
    </div>
  );
}

const mapStateToProps = state => ({
  app:state.app
})

export default connect(mapStateToProps, {setToken, setSpotify, setUser, setPlaylists})(App);

