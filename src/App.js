import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Modal from "react-modal"; // Import the Modal component
import "./App.css";
import Error from "./Error";
import Home from "./Home";
import Character from "./Components/Characters/Characters";
import Weapon from "./Components/Weapons/Weapons";

function App() {
  // Set the app element when the component mounts
  useEffect(() => {
    Modal.setAppElement("#root"); // Replace "#root" with your actual root element id
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/characters" element={<Character />} />
         <Route path="/weapons" element={<Weapon />} />
        {/*<Route path="/spells" element={<Battle />} />
        <Route path="/combat_arts" element={<Battle />} />  */}
        <Route path="/*" element={<Error />} />
      </Routes>
      
    </div>
  );
}

export default App;
