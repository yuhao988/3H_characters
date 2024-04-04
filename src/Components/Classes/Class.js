//import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import { useCharacter } from "../../CharacterContext";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_class = `${URL}/classes`;

export default function ClassList() {
  const [classList, setClassList] = useState("");
  const [startList, setStartList] = useState("");
  const [beginList, setBeginList] = useState("");
  const [intermList, setIntermList] = useState("");
  const [advanceList, setAdvanceList] = useState("");
  const [masterList, setMasterList] = useState("");
  const [dlcList, setDLCList] = useState("");
  const [otherList, setOtherList] = useState("");
  const [classBase, setClassBase] = useState("");
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  //const { setCharacter } = useCharacter();
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_class, {
          method: "GET",
        });

        const data = await response.json();

        let baseList = "";
        for (let cl in Object.values(data)) {
          const base = { ID: data[cl].ID, base: data[cl].Base };
          baseList = [...baseList, base];
        }

        setStartList(
          Object.values(data).filter((cls) => cls.Rank === "Starter")
        );
        setOtherList(
          Object.values(data).filter((cls) => cls.Rank === "Special")
        );
        setBeginList(
          Object.values(data).filter((cls) => cls.Rank === "Beginner")
        );
        setIntermList(
          Object.values(data).filter((cls) => cls.Rank === "Intermediate")
        );
        setAdvanceList(
          Object.values(data).filter((cls) => cls.Rank === "Advanced")
        );
        setMasterList(
          Object.values(data).filter((cls) => cls.Rank === "Master")
        );
        setDLCList(Object.values(data).filter((cls) => cls.Rank === "DLC"));

        setClassList(data);
        setClassBase(baseList);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!classList) {
      fetchData();
    }
  }, [classList]);

  const headers = [
    { key: 0, label: "HP" },
    { key: 1, label: "Strength" },
    { key: 2, label: "Magic" },
    { key: 3, label: "Dexterity" },
    { key: 4, label: "Speed" },
    { key: 5, label: "Luck" },
    { key: 6, label: "Defence" },
    { key: 7, label: "Resistance" },
    { key: 8, label: "Charm" },
    { key: 9, label: "Movement" },
  ];
  const intArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleSort = (column, rank) => {
    let sortedClassList = [];
    //let sortedClassList = [...classList];
    switch (rank) {
      case "Start":
        sortedClassList = [...startList];
        break;
      case "Begin":
        sortedClassList = [...beginList];
        break;
      case "Interm":
        sortedClassList = [...intermList];
        break;
      case "Advance":
        sortedClassList = [...advanceList];
        break;
      case "DLC":
        sortedClassList = [...dlcList];
        break;
      case "Master":
        sortedClassList = [...masterList];
        break;
      case "Special":
        sortedClassList = [...otherList];
        break;
      default:
        break;
    }

    if (column === sortedColumn) {
      // If the same column is clicked, reverse the order
      sortedClassList.reverse();
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorted column and default to ascending order
      setSortedColumn(column);
      setSortOrder("asc");
      // Perform sorting based on the selected column
      sortedClassList.sort((a, b) => {
        // Adjust the sorting logic based on the data type of the column

        // For numerical values, you can convert them to numbers before comparison
        return a.Base[column] - b.Base[column];
      });
    }
    // Update the state with the sorted art list
    switch (rank) {
      case "Start":
        setStartList(sortedClassList);
        break;
      case "Begin":
        setBeginList(sortedClassList);
        break;
      case "Interm":
        setIntermList(sortedClassList);
        break;
      case "Advance":
        setAdvanceList(sortedClassList);
        break;
      case "DLC":
        setDLCList(sortedClassList);
        break;
      case "Master":
        setMasterList(sortedClassList);
        break;
      case "Special":
        setOtherList(sortedClassList);
        break;
      default:
        break;
    }
    setClassList(sortedClassList);
  };

  const displayBase = (id, index) => {
    const cl = Object.values(classBase).find((cls) => cls.ID === id);
    return <td>{cl.base[index]}</td>;
  };

  return (
    <div className="container">
      <div className="main-content">
        <h1>Classes:</h1>
        <h3>Starting Class:</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              <th>Class:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  <button onClick={() => handleSort(header.key, "Start")}>
                    {header.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          {startList ? (
            <tbody>
              {Object.values(startList).map((cl, index) => (
                <tr key={index}>
                  <td>{cl.ID}</td>
                  <td>{cl.Name}</td>
                  {intArray.map((int) => displayBase(cl.ID, int))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h3>Beginner Class:</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              <th>Class:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  <button onClick={() => handleSort(header.key, "Begin")}>
                    {header.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          {beginList ? (
            <tbody>
              {Object.values(beginList).map((cl, index) => (
                <tr key={index}>
                  <td>{cl.ID}</td>
                  <td>{cl.Name}</td>
                  {intArray.map((int) => displayBase(cl.ID, int))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h3>Intermediate Class:</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              <th>Class:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  <button onClick={() => handleSort(header.key, "Interm")}>
                    {header.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          {intermList ? (
            <tbody>
              {Object.values(intermList).map((cl, index) => (
                <tr key={index}>
                  <td>{cl.ID}</td>
                  <td>{cl.Name}</td>
                  {intArray.map((int) => displayBase(cl.ID, int))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h3>Advanced Class:</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              <th>Class:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  <button onClick={() => handleSort(header.key, "Advance")}>
                    {header.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          {advanceList ? (
            <tbody>
              {Object.values(advanceList).map((cl, index) => (
                <tr key={index}>
                  <td>{cl.ID}</td>
                  <td>{cl.Name}</td>
                  {intArray.map((int) => displayBase(cl.ID, int))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h3>DLC Class:</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              <th>Class:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  <button onClick={() => handleSort(header.key, "DLC")}>
                    {header.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          {dlcList ? (
            <tbody>
              {Object.values(dlcList).map((cl, index) => (
                <tr key={index}>
                  <td>{cl.ID}</td>
                  <td>{cl.Name}</td>
                  {intArray.map((int) => displayBase(cl.ID, int))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h3>Master Class:</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              <th>Class:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  <button onClick={() => handleSort(header.key, "Master")}>
                    {header.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          {masterList ? (
            <tbody>
              {Object.values(masterList).map((cl, index) => (
                <tr key={index}>
                  <td>{cl.ID}</td>
                  <td>{cl.Name}</td>
                  {intArray.map((int) => displayBase(cl.ID, int))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <h3>Special Class:</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>ID:</th>
              <th>Class:</th>
              {headers.map((header, index) => (
                <th key={index}>
                  <button onClick={() => handleSort(header.key, "Special")}>
                    {header.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          {otherList ? (
            <tbody>
              {Object.values(otherList).map((cl, index) => (
                <tr key={index}>
                  <td>{cl.ID}</td>
                  <td>{cl.Name}</td>
                  {intArray.map((int) => displayBase(cl.ID, int))}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}
