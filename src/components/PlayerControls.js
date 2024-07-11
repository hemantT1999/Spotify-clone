import React from "react";
import "./PlayerControls.css"; // Import the CSS file

const PlayerControls = () => {
  return (
    <div className="player-controls">
      <button>Previous</button>
      <div className="current-track">Now Playing: Track Name</div>
      <button className="next">Next</button>
    </div>
  );
};

export default PlayerControls;
