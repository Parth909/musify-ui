import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import './Body.css';
// import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  setPlayTracks,
} from './actions/body';

import {
    setPlayingItem,
    setPlayingState
} from './actions/music';

function Body({
    spotify, 
    match, 
    body:{playlist_tracks}, 
    setPlayTracks, 
    music:{music_item, 
    music_playingState},
    setPlayingItem,
    setPlayingState
}) {



        // setBelongsToPlaylist(playlist_tracks.tracks.items.some(item=>(
        //     item.track.id === music_item.id
        // )))

    const [belongsToPlaylist, setBelongsToPlaylist] = useState(false);
    // const [{discover_weekly}, dispatch] = useDataLayerValue();
    useEffect(()=>{

        spotify.getPlaylist(match.params.playlist_id).then(response=>{   
            // This is action creator to set the playlist_tracks
            setPlayTracks(response);
            // for(let item of response?.tracks?.items){
            //     console.log("Item track id",item.track.id);
            //     console.log("Music item id",music_item?.id);
            // }
            setBelongsToPlaylist(response?.tracks?.items.some(item=>(
            item?.track?.id === music_item?.id
            )))
            console.log(belongsToPlaylist);
        });

        
        // some data remains in the set_item state
        // cleaning up the data that remains when playlist is changed
        return ()=> {
            setPlayTracks(null)
          }

    }, [match.params.playlist_id, music_item]);

    const playPlaylist = (id) => {
        // When the playlist button is clicked
        if(music_playingState){

            spotify.pause();
            setPlayingState(false);

        }else{

            setPlayingState(true);

            spotify.play({
                context_uri: `spotify:playlist:${match.params.playlist_id}`,
            }).then(res=>{
                // After playing the playlist update the *item & playing status*
                spotify.getMyCurrentPlayingTrack().then((r) => {
                    console.log("setplayingitem", r.item)
                    // dispatch({
                    //   type: "SET_ITEM",
                    //   item: r.item,
                    // });
                    setPlayingItem(r.item);
                    // dispatch({
                    //   type: "SET_PLAYING",
                    //   playing: true,
                    // });
                    setPlayingState(true);
                  });
            });
        }

    }

    const playSong = (id) => {
        console.log("Individual song id ----- ",id)
        spotify.play({
            uris: [`spotify:track:${id}`],
        })
        .then((res) => {
            // After playing the song update the *item & playing status*
            spotify.getMyCurrentPlayingTrack().then((r) => {
            //   dispatch({
            //     type: "SET_ITEM",
            //     item: r.item,
            //   });
            setPlayingItem(r.item);

            //   dispatch({
            //     type: "SET_PLAYING",
            //     playing: true,
            //   });
            setPlayingState(true);

            });
          });
    }

    return (
        <div className="body">
            
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
                {/* onClick={playPlaylist} */}
                <div className="body__icons">
                
                {
                    // If Music is playing show Pause Button
                    // If Music has stopped show Play Button
                    (music_playingState && belongsToPlaylist) ? (
                        <PauseCircleFilledIcon
                        className="body__playPause active"
                        onClick={playPlaylist}
                        />
                        
                    ):(
                        <PlayCircleFilledIcon
                        className="body__playPause"
                        onClick={playPlaylist}
                        />
                    )
                }
                    
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {/* List of songs */}
                {playlist_tracks?.tracks.items.map(item=>(
                    // Passing the playsong FUNCTION to the SONGROW component 
                    
                        <SongRow key={item.track.id} playSong={playSong} track={item.track}/>    
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
  body: state.body,
  music: state.music
})

export default connect(mapStateToProps, {
    setPlayTracks,
    setPlayingItem,
    setPlayingState
})(Body)
