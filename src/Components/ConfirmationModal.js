import React from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation Modal"
    >
      <div>
        <p>Are you sure you want to delete?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
