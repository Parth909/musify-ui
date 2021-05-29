import React from "react";
import { connect } from "react-redux";
import "./Search.css";
import { useDataLayerValue } from "./DataLayer";
import Row from "./Row";
import SearchRow from "./SearchRow";
import Artist from "./Artist";
import SearchLogo from "./assets/magnifying-glass.svg";
import { setSearchResult } from "./actions/search";
// using these for nested routing
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function Search({ spotify, setSearchResult, search: { search_result } }) {
  // const [{search_result}, dispatch] = useDataLayerValue();

  const gensearchResult = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    spotify
      .search(e.target.value, ["album", "artist", "playlist", "track"])
      .then((res) => {
        setSearchResult(res);
      });
  };

  console.log(search_result);

  // using the original route
  let { path, url } = useRouteMatch();

  return (
    <div className="search__div">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search for stuff</label>
        <input
          onChange={gensearchResult}
          id="search"
          type="search"
          placeholder="Search..."
          autoFocus
          required
          autoComplete="off"
        />
      </form>

      {search_result === null ? (
        <div className="search__logoDiv">
          <img className="search__logo" src={SearchLogo} alt="" />
          <span> . . . Search Musify</span>
        </div>
      ) : (
        <Switch>
          <Route exact path={path}>
            <div className="search_results">
              <SearchRow title="Albums" items={search_result?.albums?.items} />
              <SearchRow
                title="Playlists"
                items={search_result?.playlists?.items}
              />
              <SearchRow title="Tracks" items={search_result?.tracks?.items} />
              <SearchRow
                title="Artists"
                items={search_result?.artists?.items}
              />
            </div>
          </Route>
          <Route exact path={`${path}/artist/:artistId`}>
            {/* When we pass artist like this we can't access *artistId* in match.params */}
            {/* React Router Dom gives use *useParams()* for that purpose*/}
            {/* use useParams() inside Artist.js */}
            <Artist spotify={spotify} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { setSearchResult })(Search);
