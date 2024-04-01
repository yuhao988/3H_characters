import React, { useEffect, useState } from "react";
import boon from "../Images/boon.png";
import bane from "../Images/bane.png";
import bt from "../Images/budding.png";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_types = `${URL}/skill_types`;
const url_skill_list = `${URL}/charskilllist`;

export default function BoonBaneTable(props) {
  const { character } = props;

  const [skillList, setSkillList] = useState("");
  const [boonList, setBoonList] = useState("");
  const [boons, setBoons] = useState([]);
  const [banes, setBanes] = useState([]);
  const [buddingTalent, setBuddingtalent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_types, {
          method: "GET",
        });

        const data = await response.json();
        data.sort((a, b) => a.ID - b.ID);
        setSkillList(data);
      } catch (error) {
        console.error("Error fetching character data: ", error.message);
      }
    };

    const fetchList = async () => {
      try {
        const response = await fetch(`${url_skill_list}/char/${character.ID}`, {
          method: "GET",
        });

        const data = await response.json();

        setBoonList(data);
        setBoons(data.Boons);
        setBanes(data.Banes);
        setBuddingtalent(data.Budding);
      } catch (error) {
        console.error("Error fetching character data: ", error.message);
      }
    };
    if (!skillList) {
      fetchData();
    }
    if (character && !boonList) {
      fetchList();
    }
  }, [skillList, character, boonList]);

  const renderTable = () => {
    const intArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return (
      <table className="stats-table">
        <thead>
          <tr>
            {Object.values(skillList).map((skill) => (
              <th key={skill.ID}>
                {skill.Name}
                <br />
                <img
                  src={skill.SkillIcon}
                  width="30px;"
                  height="30px;"
                  alt={`${skill.Name}`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {intArray.map((i) => (
              <th>
                {boons.includes(i) ? (
                  <img src={boon} width="25px" height="25px" alt="boon" />
                ) : null}
                {banes.includes(i) ? (
                  <img src={bane} width="25px" height="25px" alt="bane" />
                ) : null}
                {buddingTalent === i ? (
                  <img src={bt} width="25px" height="25px" alt="budding" />
                ) : null}
              </th>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div>
      
      {character ? <div>{renderTable()}</div> : null}
    </div>
  );
}
