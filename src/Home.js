import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import "./Home.css";
import Row from "./Row";
import "./Row.css";
// importing the action creators
import {
  setNewRels,
  setNewFps,
  setNewCats,
  setCatPlaylist,
  setFollowedArtists,
} from "./actions/home";

function Home({
  spotify,
  setNewRels,
  setNewFps,
  setNewCats,
  // SET_CAT_PLAY_ID,
  setCatPlaylist,
  setFollowedArtists,
  home: { cat_playid, new_rels, new_fps, new_cats, cat_play, followed_artists }, //getting the things in state
}) {
  // const [{new_rels, new_fps, new_cats, cat_playid, cat_play}, dispatch] = useDataLayerValue();

  useEffect(() => {
    //   spotify.setAccessToken(token);

    // spotify.getNewReleases().then((res) => {
    //   // console.log("followed artists",res);
    //   setNewRels(res);
    // });

    spotify.getFeaturedPlaylists().then((res) => {
      // console.log("NEW REC",res);
      setNewFps(res);
    });

    spotify.getCategories({ locale: "en_US" }).then((res) => {
      // console.log("CATS",res);
      setNewCats(res);
    });

    spotify.getCategoryPlaylists(cat_playid).then((res) => {
      // console.log("Category's playlist",res);
      setCatPlaylist(res);
    });

    spotify.getCategoryPlaylists("at_home").then((res) => {
      console.log(res);
      setNewRels(res);
    });
  }, [cat_playid]);

  console.log(cat_play);

  return (
    <div>
      {/* <Header/> */}
      {/* display the different sections in different rows */}
      {/* these things here are taken from the state */}
      <div className="home__section1">
        <Row
          // these are the *toplists* category's tracks
          title="Top Lists"
          items={new_rels?.playlists?.items}
          spotify={spotify}
        />
        <Row
          title="Featured Playlists"
          items={new_fps?.playlists?.items}
          spotify={spotify}
        />
        <Row
          title="Categories"
          items={new_cats?.categories?.items}
          spotify={spotify}
        />
        <Row
          title="Interests"
          items={cat_play?.playlists?.items}
          spotify={spotify}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, {
  setNewRels,
  setNewFps,
  setNewCats,
  setCatPlaylist,
  setFollowedArtists,
})(Home);
