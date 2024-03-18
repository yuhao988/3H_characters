import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SwordList from "./Sword";
import LanceList from "./Lance";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_weapon = `${URL}/weapons`;

export default function Weapon() {
  const [weaponList, setWeaponList] = useState("");
  const [isSword, setIsSword] = useState(false);
  const [isLance, setIsLance] = useState(false);
  const [isAxe, setIsAxe] = useState(false);
  const [isBow, setIsBow] = useState(false);
  const [isBrawl, setIsBrawl] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_weapon, {
          method: "GET",
        });
        const data = await response.json();
        setWeaponList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!weaponList) {
      fetchData();
    }
  });

  const openModal = (typeID) => {
    switch (typeID) {
      case 1:
        setIsSword(true);
        break;
      case 2:
        setIsLance(true);
        break;
      default:
        break;
    }
  };

  const closeModal = (typeID) => {
    switch (typeID) {
      case 1:
        setIsSword(false);
        break;
      case 2:
        setIsLance(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Weapon page</h1>
      <h2>
        <button onClick={() => openModal(1)}>Swords</button>
      </h2>
      <div className="modal">
        <SwordList
          isOpen={isSword}
          onClose={() => closeModal(1)}
          weaponList={weaponList}
        />
      </div>
      <h2>
        <button onClick={() => openModal(2)}>Lances</button>
      </h2>
      <div className="modal">
        <LanceList
          isOpen={isLance}
          onClose={() => closeModal(2)}
          weaponList={weaponList}
        />
      </div>
      <h2>
        <button>Axes</button>
      </h2>
      <h2>
        <button>Bows</button>
      </h2>
      <h2>
        <button>Gauntlets</button>
      </h2>
      <Link to="/db">Back</Link>
    </div>
  );
}
