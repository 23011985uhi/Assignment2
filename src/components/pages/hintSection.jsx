import {useState} from 'react'
import Modal from '../Modal/modal'

function HintSection() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="col-sm">
      <h3 className="text-center">Hints</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">
          <div className="col-6 text-center">
            <p>General</p>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-primary mb-1 p-2" onClick={openModal}>Video</button>
              <button type="button" className="btn btn-primary mb-1 p-2" >Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-primary mb-1 p-2" >Video</button>
              <button type="button" className="btn btn-primary mb-1 p-2" >Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-primary mb-1 p-2" >Video</button>
              <button type="button" className="btn btn-primary mb-1 p-2" >Summary</button>
            </div>
          </div>
          <div className="col-6 text-center">
            <p>Problem Specific</p>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-success mb-1 p-2" >Video</button>
              <button type="button" className="btn btn-success mb-1 p-2" >Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-success mb-1 p-2" >Video</button>
              <button type="button" className="btn btn-success mb-1 p-2" >Summary</button>
            </div>
            <div className="mb-5 d-grid gap-2">
              <button type="button" className="btn btn-success mb-1 p-2" >Video</button>
              <button type="button" className="btn btn-success mb-1 p-2" >Summary</button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HintSection;