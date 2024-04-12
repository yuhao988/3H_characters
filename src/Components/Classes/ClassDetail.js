import Modal from "react-modal";

export default function ClassDetail(prop) {
  const { isOpen, onClose, classStat } = prop;

  const intArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const handleCloseModal = () => {
    onClose();
  };

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
    { key: 10, label: "Total" },
  ];

  const totalStat = (attr) => {
    let total = 0;
    switch (attr) {
      case 1:
        for (let i = 0; i < 9; i++) {
          total += classStat.Base[i];
        }
        break;
      case 2:
        for (let i = 0; i < 9; i++) {
          total += classStat.Bonus[i];
        }
        break;
      case 3:
        for (let i = 0; i < 9; i++) {
          total += classStat.Base[i] + classStat.Bonus[i];
        }
        break;
      case 4:
        for (let i = 0; i < 9; i++) {
          total += classStat.Growth[i];
        }
        break;
      default:
        break;
    }

    return total;
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      <h1>{classStat.Name}: </h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
        <br />
      </div>
      <table className="stats-table">
        <thead>
          <tr>
            <th></th>
            {headers.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
          </tr>
        </thead>
        {classStat ? (
          <tbody>
            <tr>
              <td>Base Stat:</td>
              {classStat.Base.map((stat, index) => (
                <td key={`base+${index}`}>{stat}</td>
              ))}
              <td>{totalStat(1)}</td>
            </tr>
            <tr>
              <td>Bonus Stat:</td>
              {classStat.Bonus.map((stat, index) => (
                <td key={`base+${index}`}>{stat}</td>
              ))}
              <td></td>
              <td>{totalStat(2)}</td>
            </tr>
            <tr>
              <td>Final Base:</td>
              {intArray.map((int, index) => (
                <td key={`base+${index}`}>
                  {classStat.Base[int] + classStat.Bonus[int]}
                </td>
              ))}
              <td>{classStat.Base[9]}</td>
              <td>{totalStat(3)}</td>
            </tr>
            <tr>
              <td>Growth:</td>
              {classStat.Growth.map((stat, index) => (
                <td key={`base+${index}`}>{stat}</td>
              ))}
              <td></td>
              <td>{totalStat(4)}</td>
            </tr>
          </tbody>
        ) : null}
      </table>
    </Modal>
  );
}
