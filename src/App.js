import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Modal from "react-modal"; // Import the Modal component
import "./App.css";
import Error from "./Error";
import Home from "./Home";
import Database from "./DB";
import Character from "./Components/Characters/Characters";
import Weapon from "./Components/Weapons/Weapons";
import CharacterDetail from "./Components/Characters/CharacterDetails";
import { CharacterProvider } from "./CharacterContext";
import Spell from "./Components/Spells/Spells";
import CombatArt from "./Components/CombatArt/CombatArtList";

function App() {
  // Set the app element when the component mounts
  useEffect(() => {
    Modal.setAppElement("#root"); // Replace "#root" with your actual root element id
  }, []);

  return (
    <CharacterProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/db" element={<Database />} />
          <Route path="/characters" element={<Character />} />
          <Route
            path="/characters/:characterName"
            element={<CharacterDetail />}
          />

          <Route path="/weapons" element={<Weapon />} />

          <Route path="/spells" element={<Spell />} />
          <Route path="/combat_arts" element={<CombatArt />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </CharacterProvider>
  );
}

export default App;
