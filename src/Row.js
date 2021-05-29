import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Row.css";
// importing the action creators
import { setCatPlayId } from "./actions/home";
import { setPlayingItem, setPlayingState } from "./actions/music";

function Row({
  items,
  title,
  setCatPlayId,
  setPlayingItem,
  setPlayingState,
  spotify,
  music: { music_playingState },
}) {
  // const [{cat_playid}, dispatch] = useDataLayerValue();

  const genCatPlaylist = (e) => {
    // console.log(e.target.getAttribute("posterid"));
    setCatPlayId(e.target.getAttribute("posterid"));
  };

  const playSong = (id) => {
    if (music_playingState) {
      spotify.pause();
      setPlayingState(false);
    } else {
      console.log("Individual song id ----- ", id);
      spotify
        .play({
          uris: [`spotify:album:${id}`],
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
  };

  return (
    // {item?.images[0].url}
    <div className="row">
      <h2 className="row__h2">{items && title}</h2>

      <div className="row__posters">
        {title === "Top Lists" &&
          items &&
          items.map((item) => (
            <Link to={`/playlist/${item?.id}`} className="link-dec-none">
              <div className="row__poster" key={item?.id}>
                <div className="inner_post">
                  <img
                    src={item?.images[0].url}
                    className="row__image"
                    alt="..."
                  />
                  <span>{item?.name}</span>
                  {item?.artists &&
                    item?.artists.map((artist) => <span>{artist?.name}</span>)}
                </div>
              </div>
            </Link>
          ))}

        {title === "Featured Playlists" &&
          items &&
          items.map((item) => (
            <Link to={`/playlist/${item?.id}`} className="link-dec-none">
              <div className="row__poster" key={item?.id}>
                <div className="inner_post">
                  <img
                    src={item?.images[0].url}
                    className="row__image"
                    alt="..."
                  />
                  <span>{item?.name}</span>
                  {item?.artists &&
                    item?.artists.map((artist) => (
                      <span>
                        <span>{artist?.name}</span>
                        <br />
                      </span>
                    ))}
                </div>
              </div>
            </Link>
          ))}

        {/* For categories */}

        {title === "Categories" &&
          items &&
          items.map((item) => (
            <div className="row__poster" key={item?.id}>
              <div className="inner_post">
                <img
                  src={item?.icons[0].url}
                  className="row__image"
                  posterid={item?.id}
                  onClick={genCatPlaylist}
                  alt="..."
                />
                <span>{item?.name}</span>
              </div>
            </div>
          ))}

        {/* for the cats playlist */}
        {title === "Interests" &&
          items &&
          items.map((item) => (
            <Link to={`/playlist/${item?.id}`} className="link-dec-none">
              <div className="row__poster" key={item?.id}>
                <div className="inner_post">
                  <img
                    src={item?.images[0].url}
                    className="row__image"
                    alt="..."
                  />
                  <span>{item?.name}</span>
                  {item?.artists &&
                    item?.artists.map((artist) => <span>{artist?.name}</span>)}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  music: state.music,
});

export default connect(mapStateToProps, {
  setCatPlayId,
  setPlayingItem,
  setPlayingState,
})(Row);
