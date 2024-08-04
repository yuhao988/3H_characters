import Modal from "react-modal";
import { useState, useEffect } from "react";
import { url_class } from "../Classes/ClassBase";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { averageResultStat } from "../Calculations/StatGrowth";
import { startClass } from "../Calculations/Miscellaneous";

export default function AddClass(prop) {
  const { isOpen, onClose, charDetail } = prop;
  const [classList, setClassList] = useState("");
  const [sliders, setSliders] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedClass, setSelectedClass] = useState("");
  const [startStat, setStartStat] = useState("");
  const [charStat, setCharStat] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_class, {
          method: "GET",
        });

        const data = await response.json();
        setClassList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    const initiateClass = () => {
      if (charDetail && sliders.length === 0) {
        const start = startClass(charDetail.ID);
        const className = Object.values(classList).filter(
          (cls) => cls.Name === start
        );
        setSliders([{ min: charDetail.BaseLv, max: 50, class: className[0] }]);
      }
    };
    if (!classList) {
      fetchData();
    } else {
      initiateClass();
    }

    if (charDetail && !startStat) {
      const {
        HP,
        Strength,
        Magic,
        Dexterity,
        Speed,
        Luck,
        Defence,
        Resistance,
        Charm,
      } = charDetail;

      const baseStats = [
        HP,
        Strength,
        Magic,
        Dexterity,
        Speed,
        Luck,
        Defence,
        Resistance,
        Charm,
      ];
      setStartStat(baseStats);
      setCharStat(baseStats);
    }
  }, [classList, charDetail, sliders, startStat]);

  const headers = [
    "HP",
    "Strength",
    "Magic",
    "Dexterity",
    "Speed",
    "Luck",
    "Defence",
    "Resistance",
    "Charm",
  ];

  const handleCloseModal = (stats) => {
    onClose(stats);
  };

  const handleSliderChange = (index, value) => {
    const newSliders = [...sliders];
    newSliders[index] = {
      min: value[0],
      max: value[1],
      class: sliders[index].class,
    };
    if (value[0] >= value[1]) {
      value[0] = value[1] - 1;
    }

    switch (sliders[index].class.Rank) {
      case "Beginner":
        if (value[0] <= 5) {
          value[0] = 5;
        }
        break;
      case "Intermediate":
        if (value[0] <= 10) {
          value[0] = 10;
        }
        break;
      case "Advanced":
      case "DLC":
        if (value[0] <= 20) {
          value[0] = 20;
        }
        break;
      case "Master":
        if (value[0] <= 30) {
          value[0] = 30;
        }
        break;
      default:
        break;
    }

    if (index > 0 && value[0] <= newSliders[index - 1].min) {
      value[0] = newSliders[index - 1].min + 1;
    }
    if (index < newSliders.length - 1) {
      switch (sliders[index + 1].class.Rank) {
        case "Beginner":
          if (value[1] <= 5) {
            value[1] = 5;
          }
          break;
        case "Intermediate":
          if (value[1] <= 10) {
            value[1] = 10;
          }
          break;
        case "Advanced":
        case "DLC":
          if (value[1] <= 20) {
            value[1] = 20;
          }
          break;
        case "Master":
          if (value[1] <= 30) {
            value[1] = 30;
          }
          break;
        default:
          break;
      }
    }

    if (
      index < newSliders.length - 1 &&
      value[1] >= newSliders[index + 1].max
    ) {
      value[1] = newSliders[index + 1].max - 1;
    }

    newSliders[index] = {
      min: value[0],
      max: value[1],
      class: sliders[index].class,
    };

    if (index > 0) {
      newSliders[index - 1].max = value[0];
    }
    if (newSliders[index + 1]) {
      newSliders[index + 1].min = value[1];
    }

    setSliders(newSliders);
    calcFinalStat();
  };

  const handleAddSlider = () => {
    if (selectedClass) {
      const oldMax = sliders[count - 1].max;
      setSliders([...sliders, { min: oldMax, max: 99, class: selectedClass }]);
      setCount(count + 1);
    }
  };

  const handleRemoveSlider = (index) => {
    const newSliders = [...sliders];
    newSliders.splice(index, 1);
    setSliders(newSliders);
    setCount(count - 1);
  };

  const handleSetClass = (e) => {
    if (e) {
      const className = Object.values(classList).filter(
        (cls) => cls.Name === e
      );

      setSelectedClass(className[0]);
    }
  };

  const calcFinalStat = () => {
    const {
      HpGrowth,
      StrGrowth,
      MagGrowth,
      DexGrowth,
      SpdGrowth,
      LckGrowth,
      DefGrowth,
      ResGrowth,
      ChaGrowth,
    } = charDetail;

    const bGrowth = [
      HpGrowth,
      StrGrowth,
      MagGrowth,
      DexGrowth,
      SpdGrowth,
      LckGrowth,
      DefGrowth,
      ResGrowth,
      ChaGrowth,
    ];

    let newStat = [...startStat]; // Initialize newStat with startStat

    sliders.forEach((slider) => {
      if (slider.class.Base) {
        const base = slider.class.Base;
        const cGrowth = slider.class.Growth;

        for (let i = slider.min; i <= slider.max; i++) {
          for (let j = 0; j < newStat.length; j++) {
            if (newStat[j] < base[j]) {
              newStat[j] = base[j];
            }

            newStat[j] = averageResultStat(
              newStat[j],
              bGrowth[j] + cGrowth[j],
              1 // Assuming 1 level increase
            );
          }
        }
      }
    });

    setCharStat(newStat);
  };

  const resetAll = () => {
    setSliders([]);
    setCount(1);
    setCharStat(startStat);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={()=>handleCloseModal(null)}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
      {charDetail && classList && charStat ? (
        <div>
          <div>
            <h2>Class Progression:</h2>
            {sliders.map((slider, index) => (
              <div key={index}>
                <br />
                {slider.class ? (
                  <label>{slider.class.Name}:</label>
                ) : (
                  <label>Class1</label>
                )}

                <RangeSlider
                  min={1}
                  max={99}
                  value={[slider.min, slider.max]}
                  onInput={(value) => handleSliderChange(index, value)}
                  formatLabel={(value) => `${value}%`}
                  className="slider-bpdy"
                />
                <span style={{ marginLeft: "10px" }}>Lv {slider.min}</span>
                <span style={{ marginLeft: "1px" }}>-{slider.max}</span>
                <br />
                {count !== 1 ? (
                  <button onClick={() => handleRemoveSlider(index)}>
                    Remove Class
                  </button>
                ) : null}
              </div>
            ))}
            <div>
              <br />
              {classList ? (
                <select
                  value={selectedClass.Name}
                  onChange={(e) => handleSetClass(e.target.value)}
                >
                  <option value={false}>-Select a class-</option>
                  {Object.values(classList).map((cls) => (
                    <option value={cls.Name}>{cls.Name}</option>
                  ))}
                </select>
              ) : (
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="null">Null</option>
                </select>
              )}

              <button onClick={handleAddSlider}>Add Class</button>
            </div>
            <br />
          </div>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Testing table:</th>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Output Stats:</th>
                {charStat.map((stat, index) => (
                  <td key={index}>{stat}</td>
                ))}
              </tr>
            </tbody>
          </table>
          {/* {console.log(calcFinalStat())} */}
        </div>
      ) : null}
      <button onClick={resetAll}>Reset</button>
      <button onClick={()=>handleCloseModal(charStat)}>Apply</button>
    </Modal>
  );
}
