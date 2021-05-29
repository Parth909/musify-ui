// Web-playback-sdk

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/home";

const clientId = "f70e5e3de3884c0d87882f1303c1008f";

// scopes decide what the user can do in the app
// In the app the user can read(play)/change the playback but cannot delete/update/publish the playlist
const scopes = [
  "user-follow-modify",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
];

export const getTokenFromUrl = () => {
  console.log(window.location.hash);
  // window.location.hash - #accessToken=mysupersecretkey&name=perry&
  // substring(1) - removes the hash - accessToken=mysupersecretkey&name=perry
  // split(&) - [accessToken=mysupersecretkey , name=perry]
  // initalValue of initial={} thf, the item = accessToken=mysupersecretkey
  // initial = {}
  /*{ accessToken: mysupersecretkey }*/
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("="); //[accessToken, mysupersecretkey]
      initial[parts[0]] = decodeURIComponent(parts[1]);
      // using [] arr-like braces we can add the PROPERTY & on RHS we can give the VALUE
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
