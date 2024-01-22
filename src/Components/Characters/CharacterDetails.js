import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useCharacter } from "../../CharacterContext";
import { url_char } from "./Characters";

export default function CharacterDetail() {
  const { selectedCharacter, setCharacter } = useCharacter();
  const { characterName } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_char, {
          method: "GET",
        });

        const data = await response.json();

        // Find the character with the matching name
        const selectCharacter = data.find(
          (character) => character.name === characterName
        );

        if (selectCharacter) {
          setCharacter(selectCharacter);
        } else {
          console.error(`Character not found: ${characterName}`);
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (characterName && !selectedCharacter) {
   
      fetchData();
    }
  }, [characterName, selectedCharacter, setCharacter]);
  const renderTable = () => {
    if (!selectedCharacter) {
      return null;
    }
    // Extract relevant data from the selected character
    const {
      strength,
      magic,
      dexterity,
      speed,
      luck,
      defence,
      resistance,
      charm,
      str_growth,
      mag_growth,
      dex_growth,
      spd_growth,
      lck_growth,
      def_growth,
      res_growth,
      cha_growth,
    } = selectedCharacter;

    // Headers row
    const headers = [
      "Strength",
      "Magic",
      "Dexterity",
      "Speed",
      "Luck",
      "Defence",
      "Resistance",
      "Charm",
    ];

    // Base stats row
    const baseStats = [
      strength,
      magic,
      dexterity,
      speed,
      luck,
      defence,
      resistance,
      charm,
    ];

    // Growth row
    const growthStats = [
      str_growth,
      mag_growth,
      dex_growth,
      spd_growth,
      lck_growth,
      def_growth,
      res_growth,
      cha_growth,
    ];

    return (
      <table className="stats-table">
        <thead>
          <tr>
            <th>Parameters:</th>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Stats:</th>
            {baseStats.map((stat, index) => (
              <td key={index}>{stat}</td>
            ))}
          </tr>
          <tr>
            <th>Growth Rates:</th>
            {growthStats.map((stat, index) => (
              <td key={index}>{stat}%</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Character: {selectedCharacter ? selectedCharacter.name : "Unknown"}</h1>
      {selectedCharacter ? <div>{renderTable()}</div> : null}

      <Link to="/characters">Back to characters page</Link>
    </div>
  );
}
