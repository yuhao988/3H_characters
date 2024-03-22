//import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as statCalc from "../Calculations/StatGrowth";

export default function DamageAnalysis(props) {
  const { charStat } = props;
  //   const [weaponUsed, setWeaponUsed] = useState("");
  //   const [combatArt, setCombatArt] = useState("");

  //   useEffect(()=>{

  //   },[weaponUsed,combatArt])
  const ironSword = {
    ID: 1,
    Might: 6,
    StrMag: true,
    Hit: 90,
    Crit: 0,
    Weight: 5,
  };
  const levinSword = {
    ID: 17,
    Might: 9,
    StrMag: false,
    Hit: 70,
    Crit: 0,
    Weight: 9,
  };

  const sunder = { ID: 4, Might: 4, StrMag: true, Critical: 3 };
  const soulblade = { ID: 13, Might: 2, StrMag: false, Hit: 10 };

  const headers = [
    { key: "Damage", label: "Damage" },
    { key: "Hit", label: "Hit Chance" },
    { key: "Critical", label: "Critical Chance" },
    { key: "AS", label: "Attack Speed" },
  ];

  const dmg = statCalc.attackDamage(charStat, ironSword);
  const hit = statCalc.attackHit(charStat, ironSword);
  const crit = statCalc.attackCritical(charStat, ironSword);
  const as = statCalc.attackSpeed(charStat, ironSword);

  const dmg2 = statCalc.attackDamage(charStat, levinSword);
  const hit2 = statCalc.attackHit(charStat, levinSword);
  const crit2 = statCalc.attackCritical(charStat, levinSword);
  const as2 = statCalc.attackSpeed(charStat, levinSword);

  const outputValue1 = [dmg, hit, crit, as];
  const outputValue2 = [dmg2, hit2, crit2, as2];

  const artDmg = statCalc.artAttack(charStat, ironSword, sunder);
  const artHit = statCalc.artHit(charStat, ironSword, sunder);
  const artCrit = statCalc.artCrit(charStat, ironSword, sunder);

  const artDmg2 = statCalc.artAttack(charStat, ironSword, soulblade);
  const artHit2 = statCalc.artHit(charStat, ironSword, soulblade);
  const artCrit2 = statCalc.artCrit(charStat, ironSword, soulblade);

  const artDmg3 = statCalc.artAttack(charStat, levinSword, sunder);
  const artHit3 = statCalc.artHit(charStat, levinSword, sunder);
  const artCrit3 = statCalc.artCrit(charStat, levinSword, sunder);

  const artDmg4 = statCalc.artAttack(charStat, levinSword, soulblade);
  const artHit4 = statCalc.artHit(charStat, levinSword, soulblade);
  const artCrit4 = statCalc.artCrit(charStat, levinSword, soulblade);

  const artValue1 = [artDmg, artHit, artCrit];
  const artValue2 = [artDmg2, artHit2, artCrit2];
  const artValue3 = [artDmg3, artHit3, artCrit3];
  const artValue4 = [artDmg4, artHit4, artCrit4];

  return (
    <div>
      Analysis here:
      <h2>Select Weapon:</h2>
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
            <th>Iron Sword:</th>
            {outputValue1.map((num, index) => (
              <td key={index}>{num}</td>
            ))}
          </tr>
          <tr>
            <th>Levin Sword:</th>
            {outputValue2.map((num, index) => (
              <td key={index}>{num}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <h3>Select Combat Art (Optional)</h3>
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
          <tr>
            <th>Iron Sunder</th>
            {artValue1.map((num, index) => (
              <td key={index}>{num}</td>
            ))}
          </tr>
          <tr>
            <th>Iron Soulblade</th>
            {artValue2.map((num, index) => (
              <td key={index}>{num}</td>
            ))}
          </tr>
          <tr>
            <th>Levin Sunder</th>
            {artValue3.map((num, index) => (
              <td key={index}>{num}</td>
            ))}
          </tr>
          <tr>
            <th>Levin Soulblade</th>
            {artValue4.map((num, index) => (
              <td key={index}>{num}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
