import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCharacter } from "../../CharacterContext";
import { url_char } from "./Characters";
import { averageResultStat } from "../Calculations/StatGrowth";

export default function CharacterDetail() {
  const { selectedCharacter, setCharacter } = useCharacter();
  const [minLevel, setMinLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(99);
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
          (character) => character.Name === characterName
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
      const baseLevel = parseInt(selectedCharacter.BaseLv, 10);
      setMinLevel(baseLevel);
    }
  }, [characterName, selectedCharacter, setCharacter]);

  // Handler for changing the target level
  const handleTargetLevelChange = (e) => {
    setTargetLevel(parseInt(e.target.value, 10)); // Parse the value to integer
  };

  const renderTable = () => {
    if (!selectedCharacter) {
      return null;
    }

    // Extract relevant data from the selected character
    const {
      HP,
      Strength,
      Magic,
      Dexterity,
      Speed,
      Luck,
      Defence,
      Resistance,
      Charm,
      HpGrowth,
      StrGrowth,
      MagGrowth,
      DexGrowth,
      SpdGrowth,
      LckGrowth,
      DefGrowth,
      ResGrowth,
      ChaGrowth,
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
      "Total",
    ];

    // Base stats row
    const baseStats = [
      HP,
      Strength,
      Magic,
      Dexterity,
      Speed,
      Luck,
      Defence,
      Resistance,
      Charm,
    ];

    // Growth row
    const growthStats = [
      HpGrowth,
      StrGrowth,
      MagGrowth,
      DexGrowth,
      SpdGrowth,
      LckGrowth,
      DefGrowth,
      ResGrowth,
      ChaGrowth,
    ];

    const lvDiff = targetLevel - minLevel;
    const finalStats = {
      finalHP: averageResultStat(HP, HpGrowth, lvDiff),
      finalStr: averageResultStat(Strength, StrGrowth, lvDiff),
      finalMag: averageResultStat(Magic, MagGrowth, lvDiff),
      finalDex: averageResultStat(Dexterity, DexGrowth, lvDiff),
      finalSpd: averageResultStat(Speed, SpdGrowth, lvDiff),
      finalLck: averageResultStat(Luck, LckGrowth, lvDiff),
      finalDef: averageResultStat(Defence, DefGrowth, lvDiff),
      finalRes: averageResultStat(Resistance, ResGrowth, lvDiff),
      finalCha: averageResultStat(Charm, ChaGrowth, lvDiff),
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
              <th>
                Lv.
                <select value={targetLevel} onChange={handleTargetLevelChange}>
                  {/* Render dropdown options from minLevel to 99 */}
                  {Array.from({ length: 100 - minLevel }, (_, i) => (
                    <option key={i} value={minLevel + i}>
                      {minLevel + i}
                    </option>
                  ))}
                </select>{" "}
                Stats:
              </th>
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
        Character: {selectedCharacter ? selectedCharacter.Name : "Unknown"}
      </h1>
      {selectedCharacter ? (
        <div>
          <img
            src={selectedCharacter.ImageLink}
            width="150px"
            height="150px"
            alt={`${selectedCharacter.Name}`}
          />
        </div>
      ) : null}
      {renderTable()}

      <Link to="/characters">Back to characters page</Link>
    </div>
  );
}
