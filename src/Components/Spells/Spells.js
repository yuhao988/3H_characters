import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_spell = `${URL}/spells`;

export default function Spell() {
  const [spellList, setSpellList] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_spell, {
          method: "GET",
        });

        const data = await response.json();

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
    "Name",
    "Might",
    "Hit",
    "Critical",
    "Weight",
    "Range",
    "Uses",
    "Description",
  ];
  const headers1 = ["Name", "Might", "Hit", "Range", "Uses", "Description"];

  const displayRange = (range_min, range_max) => {
    if (range_min === range_max || range_max===null) {
      return range_min;
    } else if (range_max === 0) {
      return "in description";
    } else {
      return range_min + "-" + range_max;
    }
  };

  return (
    <div>
      <h1>Spells list</h1>
      <h2>White Magic (Non-damage):</h2>
      <table className="stats-table">
        <thead>
          <tr>
            {headers1.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {spellList ? (
          <tbody>
            {Object.values(spellList)
              .filter((spell) => spell.Type === "Non-damage")
              .map((spell) => (
                <tr>
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
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {spellList ? (
          <tbody>
          {Object.values(spellList)
            .filter((spell) => spell.Type === "White")
            .map((spell) => (
              <tr>
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
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {spellList ? (
          <tbody>
          {Object.values(spellList)
            .filter((spell) => spell.Type === "Black")
            .map((spell) => (
              <tr>
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
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {spellList ? (
          <tbody>
          {Object.values(spellList)
            .filter((spell) => spell.Type === "Dark")
            .map((spell) => (
              <tr>
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
