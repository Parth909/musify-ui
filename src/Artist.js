import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Artist.css";
import "./Row.css";

import { setArtist, setArtistTopTracks } from "./actions/artist";

import { Link, useParams, useRouteMatch } from "react-router-dom";

function Artist({
  setArtist,
  setArtistTopTracks,
  spotify,
  artist: { artist, artistTopTracks },
}) {
  let { artistId } = useParams();

  useEffect(() => {
    spotify.getArtist(artistId).then((res) => {
      setArtist(res);
    });

    spotify.getArtistTopTracks(artistId, "US").then((res) => {
      setArtistTopTracks(res);
    });
  }, []);

  return (
    <div className="artist">
      <div className="artist_info">
        <img src={artist?.images[0]?.url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>{artist?.name}</h2>
          <p>Popularity - {artist?.popularity}</p>
        </div>
      </div>

      <h1>Top Tracks</h1>

      <div className="artist__posters">
        {artistTopTracks?.tracks &&
          artistTopTracks?.tracks.map((item) => (
            <div className="artist__poster" key={item?.id}>
              <div className="artist_post">
                <img
                  src={artist?.images[0]?.url}
                  className="artist__image"
                  alt="..."
                />
                <h4>{item?.name}</h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  artist: state.artist,
});

export default connect(mapStateToProps, { setArtist, setArtistTopTracks })(
  Artist
);
