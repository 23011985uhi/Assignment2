import './Modal.css'; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect, useRef } from 'react';


function Modal  ({ isOpen, onClose}) {
  const [videoUrl, setVideoUrl] = useState('');
  const [isConfused, setIsConfused] = useState(false);
  const [videoTime, setVideoTime] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const storage = getStorage();
      const videoRef = ref(storage, "https://firebasestorage.googleapis.com/v0/b/assignment2-23011985.appspot.com/o/chrome___dino_%20-%20Google%20Chrome%202024-05-08%2016-28-37.mp4?alt=media&token=6f39ac9d-fe16-4bef-b3f4-8a78c80f3147");

      getDownloadURL(videoRef)
        .then((url) => {
          setVideoUrl(url);
        })
        .catch((error) => {
          console.error("Failed to load video URL:", error);
        });
    }
  }, [isOpen,]);  // Dependency on isOpen and videoPath to reload when these values change

  

  if (!isOpen) return null;


  const closeModal = () => {
    onClose();
    setIsConfused(false); // Reset on close
    setVideoTime('');
  };

  const handleConfusedClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      const time = videoRef.current.currentTime.toFixed(0);
      setVideoTime(time);
      setIsConfused(true);
    }
  };

  const handleCancel = () => {
    setIsConfused(false);
  };

 

  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={closeModal}>X</button>
      
      <h2>This is a help video</h2>
      {videoUrl && (
        <div className="video-container" style={{ marginBottom: '20px' }}>
          <video src={videoUrl} ref={videoRef} controls style={{ width: '100%' }} />
        </div>
      )}

      {!isConfused ? (
        <div className="row align-items-center mt-3">
          <div className="col">
            <h2>You can watch me play the dinosaur game badly for 30 seconds as an example video</h2>
          </div>
          <div className="col-auto">
            <button className="btn btn-warning" onClick={handleConfusedClick}>Confused</button>
          </div>
        </div>
      ) : (
        <div>
          <input type="text" className="form-control" style={{ width: '100%', height: '50px' }}  defaultValue={`I am confused at ${videoTime} seconds`}  />
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-primary" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-success">Submit</button>
          </div>
        </div>
      )}
      
    </div>
  </div>
);
};

export default Modal;

