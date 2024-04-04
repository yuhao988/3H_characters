//import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { displayRange } from "../Calculations/Miscellaneous";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_CA = `${URL}/combat_arts`;

export default function CombatArt() {
  const [artList, setArtList] = useState("");
  const [swordArtList, setSwordArtList] = useState("");
  const [lanceArtList, setLanceArtList] = useState("");
  const [axeArtList, setAxeArtList] = useState("");
  const [bowArtList, setBowArtList] = useState("");
  const [brawlArtList, setBrawlArtList] = useState("");
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_CA, {
          method: "GET",
        });

        const data = await response.json();
        setSwordArtList(
          Object.values(data).filter((combatArt) => combatArt.TypeID === 1)
        );
        setLanceArtList(
          Object.values(data).filter((combatArt) => combatArt.TypeID === 2)
        );
        setAxeArtList(
          Object.values(data).filter((combatArt) => combatArt.TypeID === 3)
        );
        setBowArtList(
          Object.values(data).filter((combatArt) => combatArt.TypeID === 4)
        );
        setBrawlArtList(
          Object.values(data).filter((combatArt) => combatArt.TypeID === 5)
        );

        setArtList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!artList) {
      fetchData();
    }
  });

  const headers = [
    { key: "Name", label: "Name" },
    { key: "Might", label: "Might" },
    { key: "Hit", label: "Hit" },
    { key: "Critical", label: "Critical" },
    { key: "Range", label: "Range" },
    { key: "DurabilityCost", label: "DurabilityCost" },
  ];

  const handleSort = (column, artType) => {
    let sortedCombatArt = [];
    switch (artType) {
      case "Sword":
        sortedCombatArt = [...swordArtList];
        break;
      case "Lance":
        sortedCombatArt = [...lanceArtList];
        break;
      case "Axe":
        sortedCombatArt = [...axeArtList];
        break;
      case "Bow":
        sortedCombatArt = [...bowArtList];
        break;
      case "Brawl":
        sortedCombatArt = [...brawlArtList];
        break;
      default:
        break;
    }

    if (column === sortedColumn) {
      // If the same column is clicked, reverse the order
      sortedCombatArt.reverse();
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorted column and default to ascending order
      setSortedColumn(column);
      setSortOrder("asc");
      // Perform sorting based on the selected column
      sortedCombatArt.sort((a, b) => {
        
        // Adjust the sorting logic based on the data type of the column
        if (column === "Name") {
          return a.Name.localeCompare(b.Name);
        } else {
          // For numerical values, you can convert them to numbers before comparison
          return a[column] - b[column];
        }
      });
    }
    // Update the state with the sorted art list
    switch (artType) {
      case "Sword":
        setSwordArtList(sortedCombatArt);
        break;
      case "Lance":
        setLanceArtList(sortedCombatArt);
        break;
      case "Axe":
        setAxeArtList(sortedCombatArt);
        break;
      case "Bow":
        setBowArtList(sortedCombatArt);
        break;
      case "Brawl":
        setBrawlArtList(sortedCombatArt);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <h1>Combat Arts List:</h1>
        <h2>Sword Combat Arts:</h2>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  {header.key !== "Range" ? (
                    <button onClick={() => handleSort(header.key, "Sword")}>
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
          {swordArtList ? (
            <tbody>
              {Object.values(swordArtList).map((art, index) => (
                <tr key={index}>
                  <td>{art.ID}</td>
                  <td>{art.Name}</td>
                  <td>{art.Might}</td>
                  <td>{art.Hit}</td>
                  <td>{art.Critical}</td>
                  <td>{displayRange(art.RangeMin, art.RangeMax)}</td>
                  <td>{art.DurabilityCost}</td>
                  <td>{art.Description ? art.Description : "-"}</td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h2>Lance Combat Arts:</h2>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  {header.key !== "Range" ? (
                    <button onClick={() => handleSort(header.key, "Lance")}>
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
          {lanceArtList ? (
            <tbody>
              {Object.values(lanceArtList).map((art, index) => (
                <tr key={index}>
                  <td>{art.ID}</td>
                  <td>{art.Name}</td>
                  <td>{art.Might}</td>
                  <td>{art.Hit}</td>
                  <td>{art.Critical}</td>
                  <td>{displayRange(art.RangeMin, art.RangeMax)}</td>
                  <td>{art.DurabilityCost}</td>
                  <td>{art.Description ? art.Description : "-"}</td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h2>Axe Combat Arts:</h2>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  {header.key !== "Range" ? (
                    <button onClick={() => handleSort(header.key, "Axe")}>
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
          {axeArtList ? (
            <tbody>
              {Object.values(axeArtList).map((art, index) => (
                <tr key={index}>
                  <td>{art.ID}</td>
                  <td>{art.Name}</td>
                  <td>{art.Might}</td>
                  <td>{art.Hit}</td>
                  <td>{art.Critical}</td>
                  <td>{displayRange(art.RangeMin, art.RangeMax)}</td>
                  <td>{art.DurabilityCost}</td>
                  <td>{art.Description ? art.Description : "-"}</td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h2>Bow Combat Arts:</h2>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  {header.key !== "Range" ? (
                    <button onClick={() => handleSort(header.key, "Bow")}>
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
          {bowArtList ? (
            <tbody>
              {Object.values(bowArtList).map((art, index) => (
                <tr key={index}>
                  <td>{art.ID}</td>
                  <td>{art.Name}</td>
                  <td>{art.Might}</td>
                  <td>{art.Hit}</td>
                  <td>{art.Critical}</td>
                  <td>{displayRange(art.RangeMin, art.RangeMax)}</td>
                  <td>{art.DurabilityCost}</td>
                  <td>{art.Description ? art.Description : "-"}</td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h2>Brawling Combat Arts:</h2>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  {header.key !== "Range" ? (
                    <button onClick={() => handleSort(header.key, "Brawl")}>
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
          {brawlArtList ? (
            <tbody>
              {Object.values(brawlArtList).map((art, index) => (
                <tr key={index}>
                  <td>{art.ID}</td>
                  <td>{art.Name}</td>
                  <td>{art.Might}</td>
                  <td>{art.Hit}</td>
                  <td>{art.Critical}</td>
                  <td>{displayRange(art.RangeMin, art.RangeMax)}</td>
                  <td>{art.DurabilityCost}</td>
                  <td>{art.Description ? art.Description : "-"}</td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}
