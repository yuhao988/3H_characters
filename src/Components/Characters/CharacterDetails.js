import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCharacter } from "../../CharacterContext";
import { url_char } from "./Characters";
import { averageResultStat } from "../Calculations/StatGrowth";
import DamageAnalysis from "./DamagAnalysis";
import BoonBaneTable from "./BoonBane";

const URL = process.env.REACT_APP_BACKEND_URL;
const url_skill_list = `${URL}/charskilllist`;

export default function CharacterDetail() {
  const { selectedCharacter, setCharacter } = useCharacter();
  const [minLevel, setMinLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(30);
  const [isAnalysis, setIsAnalysis] = useState(false);
  const [finalStats, setFinalStats] = useState(null);
  const { characterName } = useParams();
  const [skillList, setSkillList] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_char, {
          method: "GET",
        });

        const data = await response.json();

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
    const fetchList = async () => {
      try {
        const response = await fetch(
          `${url_skill_list}/char/${selectedCharacter.ID}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        setSkillList(data);
      } catch (error) {
        console.error("Error fetching character data: ", error.message);
      }
    };

    if (characterName && !selectedCharacter) {
      fetchData();
    }
    if (selectedCharacter && !skillList) {
      fetchList();
    }
    if (selectedCharacter) {
      const baseLevel = parseInt(selectedCharacter.BaseLv, 10);
      setMinLevel(baseLevel);

      // Calculate finalStats whenever selectedCharacter or targetLevel changes
      const lvDiff = targetLevel - minLevel;
      const newFinalStats = {
        finalHP: averageResultStat(
          selectedCharacter.HP,
          selectedCharacter.HpGrowth,
          lvDiff
        ),
        finalStr: averageResultStat(
          selectedCharacter.Strength,
          selectedCharacter.StrGrowth,
          lvDiff
        ),
        finalMag: averageResultStat(
          selectedCharacter.Magic,
          selectedCharacter.MagGrowth,
          lvDiff
        ),
        finalDex: averageResultStat(
          selectedCharacter.Dexterity,
          selectedCharacter.DexGrowth,
          lvDiff
        ),
        finalSpd: averageResultStat(
          selectedCharacter.Speed,
          selectedCharacter.SpdGrowth,
          lvDiff
        ),
        finalLck: averageResultStat(
          selectedCharacter.Luck,
          selectedCharacter.LckGrowth,
          lvDiff
        ),
        finalDef: averageResultStat(
          selectedCharacter.Defence,
          selectedCharacter.DefGrowth,
          lvDiff
        ),
        finalRes: averageResultStat(
          selectedCharacter.Resistance,
          selectedCharacter.ResGrowth,
          lvDiff
        ),
        finalCha: averageResultStat(
          selectedCharacter.Charm,
          selectedCharacter.ChaGrowth,
          lvDiff
        ),
      };
      setFinalStats(newFinalStats);
    }
  }, [
    characterName,
    selectedCharacter,
    setCharacter,
    targetLevel,
    minLevel,
    skillList,
  ]);

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

    const totalStat = (stats) => {
      let total = 0;
      for (const i in stats) {
        total += stats[i];
      }
      total = total.toFixed(1);
      return total;
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
              <td>{totalStat(growthStats)}</td>
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
              <td>{totalStat(finalStats)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  const toggleAnalysis = () => {
    if (isAnalysis) {
      setIsAnalysis(false);
    } else {
      setIsAnalysis(true);
    }
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

      <BoonBaneTable character={selectedCharacter} boonList={skillList} />
      {renderTable()}
      <br />
      <button onClick={toggleAnalysis}>Go to damage analysis</button>

      {isAnalysis ? <DamageAnalysis charStat={finalStats} skillList={skillList}/> : null}
      <br />
      <Link to="/characters">Back to characters page</Link>
    </div>
  );
}
