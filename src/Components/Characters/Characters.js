import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useCharacter } from "../../CharacterContext";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_char = `${URL}/characters`;

export default function Character() {
  const [characterList, setCharacterList] = useState("");
  const { setCharacter } = useCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_char, {
          method: "GET",
        });

        const data = await response.json();

        setCharacterList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!characterList) {
      fetchData();
    }
  }, [characterList]);
  const onClick = (character) => {
    // Use the context to set the selected character
    setCharacter(character);
    // Navigate to the character details page
    navigate(`/characters/${character.Name}`);
  };

  return (
    <div className="container">
      <div className="main-content">
        <h1>Character page</h1>
        {characterList ? (
          <div>
            <h2>Protagonist:</h2>
            <div className="char-display">
              <button
                // className="card-img"
                key="Byleth"
                // onMouseOver={() => onHover(card)}
                // onMouseOut={() => onHoverOut()}
                onClick={() => onClick(characterList[0])}
                // onContextMenu={(event) => onRightClick(event, card)}
              >
                <img
                  src={characterList[0].ImageLink}
                  width="100px"
                  height="100px"
                  alt="Byleth"
                />
                <br />
                {characterList[0].Name}
              </button>
            </div>
            <h2>Black Eagle:</h2>
            <div className="char-display">
              {Object.values(characterList)
                .filter((char) => char.Affinity === "Black Eagle")
                .map((char, index) => (
                  <button
                    // className="card-img"
                    key={index}
                    // onMouseOver={() => onHover(card)}
                    // onMouseOut={() => onHoverOut()}
                    onClick={() => onClick(char)}
                    // onContextMenu={(event) => onRightClick(event, card)}
                  >
                    <img
                      src={char.ImageLink}
                      width="100px"
                      height="100px"
                      alt={`${char.Name}`}
                    />
                    <br />
                    {char.Name}
                  </button>
                ))}
            </div>
            <h2>Blue Lion:</h2>
            <div className="char-display">
              {Object.values(characterList)
                .filter((char) => char.Affinity === "Blue Lion")
                .map((char, index) => (
                  <button
                    // className="card-img"
                    key={index}
                    // onMouseOver={() => onHover(card)}
                    // onMouseOut={() => onHoverOut()}
                    onClick={() => onClick(char)}
                    // onContextMenu={(event) => onRightClick(event, card)}
                  >
                    <img
                      src={char.ImageLink}
                      width="100px"
                      height="100px"
                      alt={`${char.Name}`}
                    />
                    <br />
                    {char.Name}
                  </button>
                ))}
            </div>
            <h2>Golden Deer:</h2>
            <div className="char-display">
              {Object.values(characterList)
                .filter((char) => char.Affinity === "Golden Deer")
                .map((char, index) => (
                  <button
                    // className="card-img"
                    key={index}
                    // onMouseOver={() => onHover(card)}
                    // onMouseOut={() => onHoverOut()}
                    onClick={() => onClick(char)}
                    // onContextMenu={(event) => onRightClick(event, card)}
                  >
                    <img
                      src={char.ImageLink}
                      width="100px"
                      height="100px"
                      alt={`${char.Name}`}
                    />
                    <br />
                    {char.Name}
                  </button>
                ))}
            </div>
            <h2>Ashen Wolves:</h2>
            <div className="char-display">
              {Object.values(characterList)
                .filter((char) => char.Affinity === "Ashen Wolves")
                .map((char, index) => (
                  <button
                    // className="card-img"
                    key={index}
                    // onMouseOver={() => onHover(card)}
                    // onMouseOut={() => onHoverOut()}
                    onClick={() => onClick(char)}
                    // onContextMenu={(event) => onRightClick(event, card)}
                  >
                    <img
                      src={char.ImageLink}
                      width="100px"
                      height="100px"
                      alt={`${char.Name}`}
                    />
                    <br />
                    {char.Name}
                  </button>
                ))}
            </div>
            <h2>Church of Seiros:</h2>
            <div className="char-display">
              {Object.values(characterList)
                .filter((char) => char.Affinity === "Church of Seiros")
                .map((char, index) => (
                  <button
                    // className="card-img"
                    key={index}
                    // onMouseOver={() => onHover(card)}
                    // onMouseOut={() => onHoverOut()}
                    onClick={() => onClick(char)}
                    // onContextMenu={(event) => onRightClick(event, card)}
                  >
                    <img
                      src={char.ImageLink}
                      width="100px"
                      height="100px"
                      alt={`${char.Name}`}
                    />
                    <br />
                    {char.Name}
                  </button>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
