import Modal from "react-modal";
import { useState, useEffect } from "react";

export default function SwordList(prop) {
  const { isOpen, onClose, weaponList } = prop;

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
    </Modal>
  );
}
