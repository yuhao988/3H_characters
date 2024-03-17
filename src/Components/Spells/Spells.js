import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { displayRange } from "../Calculations/Miscellaneous";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_spell = `${URL}/spells`;

export default function Spell() {
  const [spellList, setSpellList] = useState("");
  const [healSpellList, setHealSpellList] = useState("");
  const [whiteSpellList, setWhiteSpellList] = useState("");
  const [blackSpellList, setBlackSpellList] = useState("");
  const [darkSpellList, setDarkSpellList] = useState("");
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_spell, {
          method: "GET",
        });

        const data = await response.json();
        setHealSpellList(
          Object.values(data).filter((spell) => spell.Type === "Non-damage")
        );
        setWhiteSpellList(
          Object.values(data).filter((spell) => spell.Type === "White")
        );
        setBlackSpellList(
          Object.values(data).filter((spell) => spell.Type === "Black")
        );
        setDarkSpellList(
          Object.values(data).filter((spell) => spell.Type === "Dark")
        );

        setSpellList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!spellList) {
      fetchData();
    }
  });
  const headers = [
  
    { key: "Name", label: "Name" },
    { key: "Might", label: "Might" },
    { key: "Hit", label: "Hit" },
    { key: "Critical", label: "Critical" },
    { key: "Weight", label: "Weight" },
    { key: "Range", label: "Range" },
    { key: "Uses", label: "Uses" },
  ];

  const headers1 = [
    
    { key: "Name", label: "Name" },
    { key: "Might", label: "Might" },
    { key: "Hit", label: "Hit" },
    { key: "Range", label: "Range" },
    { key: "Uses", label: "Uses" },
  ];

  const handleSort = (column, spellType) => {
    let sortedSpells = [];
    switch (spellType) {
      case "Non-damage":
        sortedSpells = [...healSpellList];
        break;
      case "White":
        sortedSpells = [...whiteSpellList];
        break;
      case "Black":
        sortedSpells = [...blackSpellList];
        break;
      case "Dark":
        sortedSpells = [...darkSpellList];
        break;
      default:
        break;
    }

    if (column === sortedColumn) {
      // If the same column is clicked, reverse the order
      sortedSpells.reverse();
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorted column and default to ascending order
      setSortedColumn(column);
      setSortOrder("asc");
      // Perform sorting based on the selected column
      sortedSpells.sort((a, b) => {
        // Adjust the sorting logic based on the data type of the column
        if (column === "Name") {
          return a.Name.localeCompare(b.Name);
        } else {
          // For numerical values, you can convert them to numbers before comparison
          return a[column] - b[column];
        }
      });
    }
    // Update the state with the sorted spell list
    switch (spellType) {
      case "Non-damage":
        setHealSpellList(sortedSpells);
        break;
      case "White":
        setWhiteSpellList(sortedSpells);
        break;
      case "Black":
        setBlackSpellList(sortedSpells);
        break;
      case "Dark":
        setDarkSpellList(sortedSpells);
        break;
      default:
        break;
    }
  };

 

  return (
    <div>
      <h1>Spells list</h1>
      <h2>White Magic (Non-damage):</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>ID:</th>
            {headers1.map((header, index) => (
              <th key={index}>
                {header.key !== "Range" ? (
                  <button onClick={() => handleSort(header.key, "Non-damage")}>
                    {header.label}
                  </button>
                ) : (
                  `${header.label}`
                )}
              </th>
            ))}
            <th>Description</th>
          </tr>
        </thead>
        {spellList ? (
          <tbody>
            {Object.values(healSpellList).map((spell, index) => (
              <tr key={index}>
                <td>{spell.ID}</td>
                <td>{spell.Name}</td>
                <td>{spell.Might ? spell.Might : "-"}</td>
                <td>{spell.Hit ? spell.Hit : "-"}</td>
                <td>{displayRange(spell.RangeMin, spell.RangeMax)}</td>
                <td>{spell.Uses}</td>
                <td>{spell.Description ? spell.Description : "-"}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      <h2>White Magic (Damage):</h2>
      <table className="stats-table">
        <thead>
          <tr>
          <th>ID:</th>
            {headers.map((header, index) => (
              <th key={index}>
                {header.key !== "Range" ? (
                  <button onClick={() => handleSort(header.key, "White")}>
                    {header.label}
                  </button>
                ) : (
                  `${header.label}`
                )}
              </th>
            ))}
            <th>Description</th>
          </tr>
        </thead>
        {spellList ? (
          <tbody>
            {Object.values(whiteSpellList).map((spell, index) => (
              <tr key={index}>
                <td>{spell.ID}</td>
                <td>{spell.Name}</td>
                <td>{spell.Might}</td>
                <td>{spell.Hit}</td>
                <td>{spell.Critical}</td>
                <td>{spell.Weight}</td>
                <td>{displayRange(spell.RangeMin, spell.RangeMax)}</td>
                <td>{spell.Uses}</td>
                <td>{spell.Description ? spell.Description : "-"}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      <h2>Black Magic:</h2>
      <table className="stats-table">
        <thead>
          <tr>
          <th>ID:</th>
            {headers.map((header, index) => (
              <th key={index}>
                {header.key !== "Range" ? (
                  <button onClick={() => handleSort(header.key, "Black")}>
                    {header.label}
                  </button>
                ) : (
                  `${header.label}`
                )}
              </th>
            ))}
            <th>Description</th>
          </tr>
        </thead>
        {spellList ? (
          <tbody>
            {Object.values(blackSpellList).map((spell, index) => (
              <tr key={index}>
                <td>{spell.ID}</td>
                <td>{spell.Name}</td>
                <td>{spell.Might}</td>
                <td>{spell.Hit}</td>
                <td>{spell.Critical}</td>
                <td>{spell.Weight}</td>
                <td>{displayRange(spell.RangeMin, spell.RangeMax)}</td>
                <td>{spell.Uses}</td>
                <td>{spell.Description ? spell.Description : "-"}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      <h2>Dark Magic:</h2>
      <table className="stats-table">
        <thead>
          <tr>
          <th>ID:</th>
            {headers.map((header, index) => (
              <th key={index}>
                {header.key !== "Range" ? (
                  <button onClick={() => handleSort(header.key, "Dark")}>
                    {header.label}
                  </button>
                ) : (
                  `${header.label}`
                )}
              </th>
            ))}

            <th>Description</th>
          </tr>
        </thead>
        {spellList ? (
          <tbody>
            {Object.values(darkSpellList).map((spell, index) => (
              <tr key={index}>
                <td>{spell.ID}</td>
                <td>{spell.Name}</td>
                <td>{spell.Might}</td>
                <td>{spell.Hit}</td>
                <td>{spell.Critical}</td>
                <td>{spell.Weight}</td>
                <td>{displayRange(spell.RangeMin, spell.RangeMax)}</td>
                <td>{spell.Uses}</td>
                <td>{spell.Description ? spell.Description : "-"}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>

      <Link to="/">Back</Link>
    </div>
  );
}
