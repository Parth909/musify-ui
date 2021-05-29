import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './Footer.css';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import MusicIcon from './assets/music-note.png';
// importing action creators
import {
    setPlayingItem,
    setPlayingState
} from './actions/music';
// WE CHANGE THE STATE OF THE SPOTIFY APP THROUGH OUR APP THEN ---->
// WE GET THE STATE OF THE SPOTIFY APP & THEN FIX OUR APP STATE ACCORDINGLY

function Footer({
    spotify, 
    music:{music_item, music_playingState},
    setPlayingItem,
    setPlayingState
}) {
    // getting the playing state, the item-song and token
    // const [{token, item, playing}, dispatch] = useDataLayerValue();

    //when the component will load dispatch an action aetting the *item & playing*
    useEffect(()=>{
        spotify.getMyCurrentPlaybackState().then(res=>{
            console.log("----Footer--------", res);

            // dispatch({
            //     type:"SET_PLAYING",
            //     playing:res.is_playing
            // });
            setPlayingState(res.is_playing);
            // dispatch({
            //     type:"SET_ITEM",
            //     item:res.item
            // });
            setPlayingItem(res.item);
        })
    }, [spotify]);

    const handlePlayPause = () => {
        // action setting the state of the song

        if(music_playingState){
            spotify.pause();
            // dispatch({
            //     type:"SET_PLAYING",
            //     playing:false
            // });
            setPlayingState(false);
        }else{
            spotify.play();
            // dispatch({
            //     type:"SET_PLAYING",
            //     playing:true
            // });
            setPlayingState(true);
        }
    }

    const skipNext = () => {
        // first move to the next song using spotify api
        //  get the state from spotify & dispatch an action setting the *item & playing*

        // spotify.skipToNext();
        // spotify.getMyCurrentPlaybackState().then(res=>{
        //     dispatch({
        //         type:"SET_ITEM",
        //         item:res.item
        //     });

        //     dispatch({
        //         type:"SET_PLAYING",
        //         playing:res.is_playing
        //     })
        // })

    }

    const skipPrevious = () => {
        // first move to the previous song
        //dispatch an action setting the *item & playing*

        // spotify.skipToPrevious();
        // spotify.getMyCurrentPlaybackState().then(res=>{
        //     dispatch({
        //         type:"SET_ITEM",
        //         item:res.item
        //     });

        //     dispatch({
        //         type:"SET_PLAYING",
        //         playing:res.is_playing
        //     });
        // });
    }


    return (
        <div className="footer">
            <div className="footer__left">
                {/* Album & Song Details */}
                {
                    music_item?.album?.images[0] ? (
                        <img
                        className="footer__albumLogo"
                        src={music_item?.album?.images[0]?.url}
                        alt="Album Logo"
                        />
                    ) : (
                        <img
                        className="footer__albumLogo"
                        src={MusicIcon}
                        alt="Album Logo"
                        />
                    )
                }
                
                
                <div className="footer__songInfo">
                {
                    music_item?.name ? (
                        <h4>{music_item?.name}</h4>
                    ): (
                        <h4>Play A Song</h4>
                    )
                }
                
                    
                </div>
            </div>
            <div className="footer__center">
                {/* Player Controls */}
                <SkipPreviousIcon onClick={skipPrevious} fontSize="large" className="footer__icon" />
                {
                    // If Music is playing we should show Pause Button
                    // If Music has stopped show Play Button
                    music_playingState ? (
                        <PauseCircleOutlineIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon active"
                        />
                        
                    ):(
                        <PlayCircleOutlineIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                        />
                    )
                }
                
                <SkipNextIcon onClick={skipNext} fontSize="large" className="footer__icon" />
            </div>
            <div className="footer__right">
                {/* Volume Controls */}
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
const  mapStateToProps = state => ({
    music: state.music
})

export default connect(mapStateToProps,{
    setPlayingItem,
    setPlayingState
})(Footer)
