import './Modal.css'; 
import React from 'react'

function Modal  ({ isOpen, onClose }) {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={closeModal}>X</button>
        <h2>This is a modal</h2>
        <p>Modal content goes here...</p>
        <div className="d-flex align-items-end flex-column" >
        <button className="btn btn-warning ">Confused</button>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;