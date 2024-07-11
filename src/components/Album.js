import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Album.css"; // Import the CSS file

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const _token = localStorage.getItem("spotify_token");

    if (_token) {
      axios
        .get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        })
        .then((response) => {
          setAlbum(response.data);
          setTracks(response.data.tracks.items);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div className="album">
      {album ? (
        <div>
          <h1>{album.name}</h1>
          {tracks.length > 0 ? (
            <ul>
              {tracks.map((track) => (
                <li key={track.track.id}>{track.track.name}</li>
              ))}
            </ul>
          ) : (
            <p>No tracks found</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Album;
