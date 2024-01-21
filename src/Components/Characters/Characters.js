import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_char = `${URL}/characters`;

export default function Character() {
  const [characterList, setCharacterList] = useState("");
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
  },[characterList]);
  const onClick = (characterName) => {
    // Use the `Link` component to navigate to the individual character page
    window.location.href = `/characters/${characterName}`;
  };

  return (
    <div>
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
               onClick={() => onClick(characterList[0].name)}
              // onContextMenu={(event) => onRightClick(event, card)}
            >
              <img
                src={characterList[0].image_link}
                width="100px"
                height="100px"
                alt="Byleth"
              />
              <br />
              {characterList[0].name}
            </button>
          </div>
          <h2>Black Eagle:</h2>
          <div className="char-display">
            {Object.values(characterList)
              .filter((char) => char.id >= 27 && char.id <= 34)
              .map((char, index) => (
                <button
                  // className="card-img"
                  key={index}
                  // onMouseOver={() => onHover(card)}
                  // onMouseOut={() => onHoverOut()}
                  onClick={() => onClick(char.name)}
                  // onContextMenu={(event) => onRightClick(event, card)}
                >
                  <img
                    src={char.image_link}
                    width="100px"
                    height="100px"
                    alt={`${char.name}`}
                  />
                  <br />
                  {char.name}
                </button>
              ))}
          </div>
          <h2>Blue Lion:</h2>
          <div className="char-display">
            {Object.values(characterList)
              .filter((char) => char.id >= 35 && char.id <= 42)
              .map((char, index) => (
                <button
                  // className="card-img"
                  key={index}
                  // onMouseOver={() => onHover(card)}
                  // onMouseOut={() => onHoverOut()}
                  onClick={() => onClick(char.name)}
                  // onContextMenu={(event) => onRightClick(event, card)}
                >
                  <img
                    src={char.image_link}
                    width="100px"
                    height="100px"
                    alt={`${char.name}`}
                  />
                  <br />
                  {char.name}
                </button>
              ))}
          </div>
          <h2>Golden Deer:</h2>
          <div className="char-display">
            {Object.values(characterList)
              .filter((char) => char.id >= 43 && char.id <= 50)
              .map((char, index) => (
                <button
                  // className="card-img"
                  key={index}
                  // onMouseOver={() => onHover(card)}
                  // onMouseOut={() => onHoverOut()}
                  onClick={() => onClick(char.name)}
                  // onContextMenu={(event) => onRightClick(event, card)}
                >
                  <img
                    src={char.image_link}
                    width="100px"
                    height="100px"
                    alt={`${char.name}`}
                  />
                  <br />
                  {char.name}
                </button>
              ))}
          </div>
        </div>
      ) : null}
      <Link to="/">Back</Link>
    </div>
  );
}
