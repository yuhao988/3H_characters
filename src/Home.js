import React from "react";
//import { Link } from "react-router-dom";
import Character from "./Components/Characters/Characters";
import "./App.css";

function Home() {
  return (
    <div className="container">
      
      <div className="main-content">
        
          <Character />
          
        
      </div>
    </div>
  );
}

export default Home;
