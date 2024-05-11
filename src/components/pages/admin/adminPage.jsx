

function AdminPage({ isOpen, onClose }) {
  if (!isOpen) return null;

  const closeAdminPage = () => {
    onClose();
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={closeAdminPage}>X</button>
        <h2>Admin Content</h2>
        
        <div className="d-flex align-items-end flex-column" >
       
        </div>
        
      </div>
    </div>
  );
};

export default AdminPage;