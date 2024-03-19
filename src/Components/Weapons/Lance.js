import Modal from "react-modal";
import { useState, useEffect } from "react";
import { displayRange } from "../Calculations/Miscellaneous";

export default function LanceList(prop) {
  const { isOpen, onClose, weaponList } = prop;
  const [listOfLances, setListOfLances] = useState("");
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (isOpen && !listOfLances) {
      setListOfLances(
        Object.values(weaponList).filter((weapon) => weapon.TypeID === 2)
      );
    }
  }, [isOpen, weaponList, listOfLances]);

  const handleCloseModal = () => {
    onClose();
  };

  const headers = [
    { key: "Name", label: "Name" },
    { key: "Might", label: "Might" },
    { key: "Hit", label: "Hit" },
    { key: "Critical", label: "Critical" },
    { key: "Weight", label: "Weight" },
    { key: "Range", label: "Range" },
    { key: "Durability", label: "Durability" },
  ];

  const handleSort = (column) => {
    let sortedWeapons = [...listOfLances];

    if (column === sortedColumn) {
      // If the same column is clicked, reverse the order
      sortedWeapons.reverse();
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set it as the sorted column and default to ascending order
      setSortedColumn(column);
      setSortOrder("asc");
      // Perform sorting based on the selected column
      sortedWeapons.sort((a, b) => {
        // Adjust the sorting logic based on the data type of the column
        if (column === "Name") {
          return a.Name.localeCompare(b.Name);
        } else {
          // For numerical values, you can convert them to numbers before comparison
          return a[column] - b[column];
        }
      });
    }
    // Update the state with the sorted weapon list
    setListOfLances(sortedWeapons);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      <h1>Lances:</h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
      <table className="stats-table">
        <thead>
          <tr>
            <th>ID:</th>
            {headers.map((header, index) => (
              <th key={index}>
                {header.key !== "Range" ? (
                  <button onClick={() => handleSort(header.key)}>
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
        {listOfLances ? (
          <tbody>
            {Object.values(listOfLances).map((weapon, index) => (
              <tr key={index}>
                <td>{weapon.ID}</td>
                <td>{weapon.Name}</td>
                <td>{weapon.Might}</td>
                <td>{weapon.Hit}</td>
                <td>{weapon.Critical}</td>
                <td>{weapon.Weight}</td>
                <td>{displayRange(weapon.RangeMin, weapon.RangeMax)}</td>
                <td>{weapon.Durability}</td>
                <td>{weapon.Description ? weapon.Description : "-"}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </Modal>
  );
}
