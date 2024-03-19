import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SwordList from "./Sword";
import LanceList from "./Lance";
import AxeList from "./Axe";
import BowList from "./Bow";
import BrawlList from "./Gauntlet";

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
      case 3:
        setIsAxe(true);
        break;
      case 4:
        setIsBow(true);
        break;
      case 5:
        setIsBrawl(true);
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
      case 3:
        setIsAxe(false);
        break;
      case 4:
        setIsBow(false);
        break;
      case 5:
        setIsBrawl(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Weapon page</h1>

      <div>
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
          <button onClick={() => openModal(3)}>Axes</button>
        </h2>
        <AxeList
          isOpen={isAxe}
          onClose={() => closeModal(3)}
          weaponList={weaponList}
        />
        <h2>
          <button onClick={() => openModal(4)}>Bows</button>
        </h2>
        <BowList
          isOpen={isBow}
          onClose={() => closeModal(4)}
          weaponList={weaponList}
        />
        <h2>
          <button onClick={() => openModal(5)}>Gauntlets</button>
        </h2>
        <BrawlList
          isOpen={isBrawl}
          onClose={() => closeModal(5)}
          weaponList={weaponList}
        />
      </div>
      <Link to="/db">Back</Link>
    </div>
  );
}
