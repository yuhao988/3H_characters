import React, { useEffect, useState } from "react";
import boon from "../Images/boon.png";
import bane from "../Images/bane.png";
import bt from "../Images/budding.png";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_types = `${URL}/skill_types`;

export default function BoonBaneTable(props) {
  const { character, boonList } = props;

  const [skillList, setSkillList] = useState("");

  const [boons, setBoons] = useState("");
  const [banes, setBanes] = useState("");
  const [buddingTalent, setBuddingtalent] = useState("");

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

    if (!skillList) {
      fetchData();
    }
    if ((!boons || !banes || !buddingTalent) && boonList) {
      setBoons(boonList.Boons);
      setBanes(boonList.Banes);
      setBuddingtalent(boonList.Budding);
    }
  }, [skillList, boons, banes, buddingTalent, boonList]);

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
              <th key={i}>
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

  return <div>{character ? <div>{renderTable()}</div> : null}</div>;
}
