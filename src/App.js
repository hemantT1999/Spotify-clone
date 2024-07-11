import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Search from "./components/Search";
import PlayerControls from "./components/PlayerControls";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <PlayerControls />
      </div>
    </Router>
  );
};

export default App;
