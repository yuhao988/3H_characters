import React, { createContext, useContext, useState } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const setCharacter = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <CharacterContext.Provider value={{ selectedCharacter, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};