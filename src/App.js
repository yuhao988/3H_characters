import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import "./App.css";
import Error from "./Error";
import Home from "./Home";
import Sidebar from "./SideBar";
import Character from "./Components/Characters/Characters";
import Weapon from "./Components/Weapons/Weapons";
import CharacterDetail from "./Components/Characters/CharacterDetails";
import { CharacterProvider } from "./CharacterContext";
import Spell from "./Components/Spells/Spells";
import CombatArt from "./Components/CombatArt/CombatArtList";
import ClassBase from "./Components/Classes/ClassBase";
import ClassBonus from "./Components/Classes/ClassBonus";
import ClassGrowth from "./Components/Classes/ClassGrowth";

function App() {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <CharacterProvider>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Character />} />
            <Route
              path="/characters/:characterName"
              element={<CharacterDetail />}
            />
            <Route path="/weapons" element={<Weapon />} />
            <Route path="/spells" element={<Spell />} />
            <Route path="/combat_arts" element={<CombatArt />} />
            <Route path="/class_base" element={<ClassBase />} />
            <Route path="/class_bonus" element={<ClassBonus />} />
            <Route path="/class_growth" element={<ClassGrowth />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </CharacterProvider>
  );
}

export default App;
