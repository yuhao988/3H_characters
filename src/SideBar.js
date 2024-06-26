// Sidebar.js

import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Fire Emblem: Three Houses database</h2>
      <h4>Main Page:</h4>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
      </ul>
      <h4>Developer Database:</h4>
      <ul>
        <li>
          <Link to="/weapons">weapons</Link>
        </li>
        <li>
          <Link to="/spells">spells</Link>
        </li>
        <li>
          <Link to="/combat_arts">combat arts</Link>
        </li>
        <li><Link to="/class_base">class base</Link></li>
        <li><Link to="/class_bonus">class bonus</Link></li>
        <li><Link to="/class_growth">class growth</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
