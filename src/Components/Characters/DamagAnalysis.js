//import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as statCalc from "../Calculations/StatGrowth";
import { url_weapon } from "../Weapons/Weapons";
import { url_spell } from "../Spells/Spells";
import { url_CA } from "../CombatArt/CombatArtList";

export default function DamageAnalysis(props) {
  const { charStat } = props;
  const [weaponList, setWeaponList] = useState("");
  const [weapontypeID, setWeapontypeID] = useState(0);
  const [filterdWeaponList, setFilterdWeaponList] = useState("");
  const [weaponUsed, setWeaponUsed] = useState("");
  const [combatArtList, setCombatArtList] = useState("");
  const [filterdCAList, setFilterdCAList] = useState("");
  const [spellList, setSpellList] = useState("");
  const [filterdSpellList, setFilteredSpellList] = useState("");

  useEffect(() => {
    const fetchWeaponData = async () => {
      try {
        const response = await fetch(url_weapon, {
          method: "GET",
        });

        const data = await response.json();
        setWeaponList(data);
      } catch (error) {
        console.error("Error fetching character data: ", error.message);
      }
    };
    const fetchSpellData = async () => {
      try {
        const response = await fetch(url_spell, {
          method: "GET",
        });

        const data = await response.json();
        setSpellList(data);
      } catch (error) {
        console.error("Error fetching character data: ", error.message);
      }
    };
    const fetchCAData = async () => {
      try {
        const response = await fetch(url_CA, {
          method: "GET",
        });

        const data = await response.json();
        setCombatArtList(data);
      } catch (error) {
        console.error("Error fetching character data: ", error.message);
      }
    };
    if (!weaponList || !combatArtList || !spellList) {
      fetchCAData();
      fetchWeaponData();
      fetchSpellData();
    }
  }, [weaponList, combatArtList, spellList]);

  const handleWeaponTypeChange = (e) => {
    const typeID = parseInt(e.target.value);
    const filterList = Object.values(weaponList).filter(
      (weapon) => weapon.TypeID === typeID
    );

    setWeapontypeID(typeID);
    setFilterdWeaponList(filterList);
  };

  const filterCombatArt = (weapon) => {
    
    const filterList = Object.values(combatArtList).filter(
      (art) =>      
        parseInt(art.TypeID) === weapon.TypeID &&
        art.Description && 
        (!art.Description.includes("only") ||
        art.Description.includes(weapon.Name))
    );
    
    setFilterdCAList(filterList);
  };

  const handleWeaponChange = (e) => {
    const selectedWeaponID = parseInt(e.target.value); // Parse the value to integer
    const selectedWeapon = weaponList.find(
      (weapon) => weapon.ID === selectedWeaponID
    );
    filterCombatArt(selectedWeapon);
    setWeaponUsed(selectedWeapon); // Set the selected weapon object
  };

  const headers = [
    { key: "Damage", label: "Damage" },
    { key: "Hit", label: "Hit Chance" },
    { key: "Critical", label: "Critical Chance" },
    { key: "AS", label: "Attack Speed" },
  ];

  const calcWeaponOutcome = (charStat, weaponStat) => {
    const dmg = statCalc.attackDamage(charStat, weaponStat);
    const hit = statCalc.attackHit(charStat, weaponStat);
    const crit = statCalc.attackCritical(charStat, weaponStat);
    const as = statCalc.attackSpeed(charStat, weaponStat);

    return [dmg, hit, crit, as];
  };

  const calcCAOutcome = (charStat, weaponStat, artStat) => {
    const artDmg = statCalc.artAttack(charStat, weaponStat, artStat);
    const artHit = statCalc.artHit(charStat, weaponStat, artStat);
    const artCrit = statCalc.artCrit(charStat, weaponStat, artStat);
    return [artDmg, artHit, artCrit];
  };

  return (
    <div>
      Analysis here:
      <h2>Select Weapon Type:</h2>
      <select value={weapontypeID} onChange={handleWeaponTypeChange}>
        <option key="Sword" value="1">
          Sword
        </option>
        <option key="Lance" value="2">
          Lance
        </option>
        <option key="Axe" value="3">
          Axe
        </option>
        <option key="Bow" value="3">
          Bow
        </option>
        <option key="Brawl" value="5">
          Gauntlets
        </option>
      </select>
      <h3>Select Weapon:</h3>
      {filterdWeaponList ? (
        <select value={weaponUsed.ID} onChange={handleWeaponChange}>
          {Object.values(filterdWeaponList).map((weapon, index) => (
            <option key={index} value={weapon.ID}>
              {weapon.Name}
            </option>
          ))}
        </select>
      ) : (
        <p>First select a weapon type</p>
      )}
      {weaponUsed ? (
        <table className="stats-table">
          <thead>
            <tr>
              <th></th>{" "}
              {headers.map((header, index) => (
                <th key={index}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{weaponUsed.Name}:</th>
              {calcWeaponOutcome(charStat, weaponUsed).map((num, index) => (
                <td key={index}>{num}</td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : null}
      <h3>Possible Combat Art Damage output:</h3>
      <table className="stats-table">
        <thead>
          <tr>
            <th></th>
            <th>Attack</th>
            <th>Hit Rate</th>
            <th>Crit Chance</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(filterdCAList).map((CA) => (
            <tr>
              <th>{CA.Name}</th>
              {calcCAOutcome(charStat, weaponUsed, CA).map((num, index) => (
                <td key={index}>{num}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
