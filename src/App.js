import React, { useState } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import CNNNews from "./component/CNNNews";
import CNBCNews from "./component/CNBCNews";
import BBCNews from "./component/BBCNews";
import VOANews from "./component/VOANews";
import "./app.css"
import "./index.css"

export default function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/" className="home-btn">
          <h2 className="font-bold">ENews</h2>
        </Link>
        <button className="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded);}}><i class="bi bi-list"></i></button>
        <div className={isNavExpanded ? "navbar-item expanded" : "navbar-item"}>
          <div className="navbar-list">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-item"
              }
            >
              CNN
            </NavLink>
            <NavLink
              to="cnbcnews"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-item"
              }
            >
              CNBC
            </NavLink>
            <NavLink
              to="bbcnews"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-item"
              }
            >
              BBC
            </NavLink>
            <NavLink
              to="voanews"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-item"
              }
            >
              VOA
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<CNNNews />} />
          <Route path="cnbcnews" element={<CNBCNews />} />
          <Route path="bbcnews" element={<BBCNews />} />
          <Route path="voanews" element={<VOANews />} />
        </Routes>
      </div>
    </div>
  );
}
