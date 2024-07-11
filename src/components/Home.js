import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getTokenFromUrl, loginUrl } from "../spotifyAuth";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      localStorage.setItem("spotify_token", _token);

      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        })
        .then((response) => {
          setPlaylists(response.data.items);
        })
        .catch((error) => console.error(error));
    } else {
      const storedToken = localStorage.getItem("spotify_token");
      if (storedToken) {
        setToken(storedToken);
        axios
          .get("https://api.spotify.com/v1/me/playlists", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((response) => {
            setPlaylists(response.data.items);
          })
          .catch((error) => console.error(error));
      }
    }
  }, []);

  return (
    <div className="home">
      {!token ? (
        <a href={loginUrl}>Login to Spotify</a>
      ) : (
        <div>
          <h1>Your Playlists</h1>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-item">
                <Link to={`/album/${playlist.id}`}>{playlist.name}</Link>
              </div>
            ))
          ) : (
            <p>No playlists found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
