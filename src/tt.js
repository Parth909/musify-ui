// do nothing
// Testing if the assignee function works properly when created a pull request
console.log('Welcome to Musify');


      // spotify.getPlaylist("0vZcMiYx5QFnwB3Ppw55Eh").then(response=>{
      //         console.log(response);
      //           dispatch({
      //             type:"SET_DISCOVER_WEEKLY",
      //             discover_weekly:response
      //           });
      //         });


      useEffect(()=>{
        // exporting from spotify.js
        const hashObj = getTokenFromUrl();
        window.location.hash = "";//clearing the url
    
        const _token = hashObj.access_token;
    
        if(_token){
    
          dispatch({
            type:'SET_TOKEN',
            token:_token
          })
    
          //SWA
          spotify.setAccessToken(_token);
    
          // returns a promise
          spotify.getMe().then(user=>{
            console.log("Person", user);
    
            // pushing it in the data layer
            dispatch({
              type: 'SET_USER',
              user: user
            });
    
          });
    
          spotify.getUserPlaylists().then((playlists)=>{
            // dispatching the user playlist in the data layer
    
            dispatch({
              type:"SET_PLAYLISTS",
              playlists:playlists
            })
          });
    
        }
    
      }, [token, dispatch]);
    


      // doing normally without context & reducer
      token ? (
        // Player
        <Player spotify={spotify}/>
      ) : (
        // Login
        <Login/>
      )



    






      import React,{useEffect} from 'react';
      import './Body.css';
      import { useDataLayerValue } from './DataLayer';
      import Header from './Header';
      import SongRow from "./SongRow";
      import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
      import FavoriteIcon from "@material-ui/icons/Favorite";
      import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
      import {
        setPlayTracks
      } from './actions/body'
      import { connect } from 'react-redux';
      
      function Body({spotify, match, body:{playlist_tracks}}) {
          const [{discover_weekly}, dispatch] = useDataLayerValue();
      
          useEffect(()=>{
              spotify.getPlaylist(match.params.playlist_id).then(response=>{
                // console.log("-----PLAYLIST DATA------",response);
                  // dispatch({
                  //   type:"SET_PLAYLIST_TRACKS",
                  //   discover_weekly:response
                  // });
                  setPlayTracks(response);
      
                });
      
                //some data remains in the discover__weekly
                //cleaning up the data that remains bcz we need the new discover__weekly
                return ()=> {
                  // dispatch({
                  //   type:"SET_DISCOVER_WEEKLY",
                  //   discover_weekly:null
                  // });
                  setPlayTracks(null);
                }
      
          }, [match.params.playlist_id]);
      
          const playPlaylist = (id) => {
              spotify.play({
                  context_uri: `spotify:playlist:${match.params.playlist_id}`,
              }).then(res=>{
                  // After playing the playlist update the *item & playing status*
                  spotify.getMyCurrentPlayingTrack().then((r) => {
                      dispatch({
                        type: "SET_ITEM",
                        item: r.item,
                      });
                      dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                      });
                    });
              });
          }
      
          const playSong = (id) => {
              console.log("Individual song id ----- ",id)
              spotify.play({
                  uris: [`spotify:track:${id}`],
              })
              .then((res) => {
                  // After playing the song update the *item & playing status*
                  spotify.getMyCurrentPlayingTrack().then((r) => {
                    dispatch({
                      type: "SET_ITEM",
                      item: r.item,
                    });
                    dispatch({
                      type: "SET_PLAYING",
                      playing: true,
                    });
                  });
                });
          }
      
          return (
              <div className="body">
                  {/* Header */}
                  <Header spotify={spotify}/>
                  {/* Banner */}
                  <div className="body__info">
                      <img src={playlist_tracks?.images[0]?.url} alt=""/>
                      <div className="body__infoText">
                          <strong>PLAYLIST</strong>
                          <h2>{playlist_tracks?.name}</h2>
                          <p>{playlist_tracks?.description}</p>
                      </div>
                  </div>
                  <div className="body__songs">
                      {/* Body Icons */}
                      <div className="body__icons">
                          <PlayCircleFilledIcon
                              className="body__shuffle"
                              onClick={playPlaylist}
                          />
                          <FavoriteIcon fontSize="large" />
                          <MoreHorizIcon />
                      </div>
      
                      {/* List of songs */}
                      {playlist_tracks?.tracks.items.map(item=>(
                          // Passing the playsong FUNCTION to the SONGROW component 
                          <SongRow key={item.track.name} playSong={playSong} track={item.track}/>
                      ))}
                  </div>
              </div>
          )
      }
      
      const mapStateToProps = state => ({
        body:state.body
      })
      
      export default connect(mapStateToProps, {setPlayTracks})(Body)
      