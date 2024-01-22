import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCharacter } from "../../CharacterContext";
import { url_char } from "./Characters";
import { averageResultStat } from "../Calculations/StatGrowth";

export default function CharacterDetail() {
  const { selectedCharacter, setCharacter } = useCharacter();
  const [minLevel, setMinLevel] = useState(1);
  const [targetLevel, setTargetlevel] = useState(99);
  const { characterName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_char, {
          method: "GET",
        });

        const data = await response.json();

        // Find the character with the matching name
        const foundCharacter = data.find(
          (character) => character.name === characterName
        );

        if (foundCharacter) {
          setCharacter(foundCharacter);
        } else {
          console.error(`Character not found: ${characterName}`);
        }
      } catch (error) {
        console.error("Error fetching character data: ", error.message);
      }
    };

    // Fetch data only if characterName is available and selectedCharacter is not set
    if (characterName && !selectedCharacter) {
      fetchData();
    }
    if (selectedCharacter) {
      const baseLevel = parseInt(selectedCharacter.base_lv, 10);
      setMinLevel(baseLevel);
    }
  }, [characterName, selectedCharacter, setCharacter]);

  const renderTable = () => {
    if (!selectedCharacter) {
      return null;
    }

    // Extract relevant data from the selected character
    const {
      hp,
      strength,
      magic,
      dexterity,
      speed,
      luck,
      defence,
      resistance,
      charm,
      hp_growth,
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
      "HP",
      "Strength",
      "Magic",
      "Dexterity",
      "Speed",
      "Luck",
      "Defence",
      "Resistance",
      "Charm",
      "Total"
    ];

    // Base stats row
    const baseStats = [
      hp,
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
      hp_growth,
      str_growth,
      mag_growth,
      dex_growth,
      spd_growth,
      lck_growth,
      def_growth,
      res_growth,
      cha_growth,
    ];

    const lvDiff = targetLevel - minLevel;
    const finalStats = {
      finalHP: averageResultStat(hp,hp_growth,lvDiff),
      finalStr: averageResultStat(strength, str_growth, lvDiff),
      finalMag: averageResultStat(magic, mag_growth, lvDiff),
      finalDex: averageResultStat(dexterity, dex_growth, lvDiff),
      finalSpd: averageResultStat(speed, spd_growth, lvDiff),
      finalLck: averageResultStat(luck, lck_growth, lvDiff),
      finalDef: averageResultStat(defence, def_growth, lvDiff),
      finalRes: averageResultStat(resistance, res_growth, lvDiff),
      finalCha: averageResultStat(charm, cha_growth, lvDiff),
    };

    return (
      <div className="table-container">
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
              <th>Lv.{minLevel} Stats:</th>
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
            <tr>
              <th>Lv.{targetLevel} Stats:</th>
              {Object.values(finalStats).map((stat, index) => (
                <td key={index}>{stat}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="character-detail-container">
      <h1>
        Character: {selectedCharacter ? selectedCharacter.name : "Unknown"}
      </h1>
      {selectedCharacter ? (
        <div>
          <img
            src={selectedCharacter.image_link}
            width="150px"
            height="150px"
            alt={`${selectedCharacter.name}`}
          />
        </div>
      ) : null}
      {renderTable()}

      <Link to="/characters">Back to characters page</Link>
    </div>
  );
}
