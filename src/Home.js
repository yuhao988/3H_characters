import React from "react";
import fe3h from "./Components/Images/three_houses.jpg"
import "./App.css";

function Home() {
  return (
    <div className="container">
      
      <div className="main-content">
        
        <h1>Fire Emblem Three Houses</h1>
        <img src={fe3h}  width="1000px" alt="game-img" />
        <p>Damage analysis and character/Item data</p>
        <p>Click on different parts on the left</p>
          
        
      </div>
    </div>
  );
}

export default Home;
