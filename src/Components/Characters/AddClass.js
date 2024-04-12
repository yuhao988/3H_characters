import Modal from "react-modal";
import { useState, useEffect } from "react";
import { url_class } from "../Classes/ClassBase";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function AddClass(prop) {
  const { isOpen, onClose, charDetail } = prop;
  const [classList, setClassList] = useState("");
  const [slider1, setSlider1] = useState([20, 80]); // Set initial values for the sliders
  const [slider2, setSlider2] = useState([20, 80]);

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
    if (!classList) {
      fetchData();
    }
  });

  const handleCloseModal = () => {
    onClose();
  };

  // const {
  //   HP,
  //   Strength,
  //   Magic,
  //   Dexterity,
  //   Speed,
  //   Luck,
  //   Defence,
  //   Resistance,
  //   Charm,
  //   HpGrowth,
  //   StrGrowth,
  //   MagGrowth,
  //   DexGrowth,
  //   SpdGrowth,
  //   LckGrowth,
  //   DefGrowth,
  //   ResGrowth,
  //   ChaGrowth,
  // } = charDetail;

  const handleSlider1Change = (value) => {
    const [min, max] = value;
    const newSlider1 = [min, max];
    const newSlider2 = [...slider2];

    // Ensure slider A's end value is smaller than slider B's start value

    newSlider2[0] = newSlider1[1];

    setSlider1(newSlider1);
    setSlider2(newSlider2);
  };

  const handleSlider2Change = (value) => {
    const [min, max] = value;
    const newSlider2 = [min, max];
    const newSlider1 = [...slider1];

    // Ensure slider B's start value is greater than slider A's end value

    newSlider1[1] = newSlider2[0];

    setSlider1(newSlider1);
    setSlider2(newSlider2);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
      <div>
        <div>
          <label>Slider A:</label>
          <RangeSlider
            min={1}
            max={99}
            value={slider1}
            onInput={handleSlider1Change}
            formatLabel={(value) => `${value}%`}
          />
        </div>
        <div>
          <label>Slider B:</label>
          <RangeSlider
            min={1}
            max={99}
            value={slider2}
            onInput={handleSlider2Change}
            formatLabel={(value) => `${value}%`}
          />
        </div>
      </div>
    </Modal>
  );
}
