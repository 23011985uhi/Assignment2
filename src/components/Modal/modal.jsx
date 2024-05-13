import './modal.css'; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect, useRef, useContext } from 'react';
import { serverTimestamp, getDatabase,  set, ref as databaseRef, push} from "firebase/database";
import {db} from '../../services/firebase'
import {useAuth} from '../pages/authContext'

function Modal  ({ isOpen, onClose}) {
  const [videoUrl, setVideoUrl] = useState('');
  const [isConfused, setIsConfused] = useState(false);
  const [videoTime, setVideoTime] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  const textareaRef = useRef(null);
  const videoRef = useRef(null);

  const { user } = useAuth();

 // console.log(user);
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
  }, [isOpen,]);  

  useEffect(() => {
    if (isConfused) {
      textareaRef.current.focus(); 
    }
  }, [isConfused]);

  if (!isOpen) return null;


  const closeModal = () => {
    onClose();
    setIsConfused(false); // Reset on close
    setVideoTime('');
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
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

  const handleSubmit = async () => {
     // Access the current user from the AuthContext
  
    const confusionText = textareaRef.current.value;
    setIsConfused(false);
    setVideoTime('');
    textareaRef.current.value = '';
    
    // Ensure user is logged in before proceeding
    if (!user) {
      console.error("User not logged in.");
      return;
    }
  
    try {
      // Generate a unique chat room ID
      const chatroomId = Date.now();
      
  
      // Get a reference to the Firebase Realtime Database
      const db = getDatabase();
      const chatroomsRef = databaseRef(db, `Chats/generalvideo/chatrooms/${chatroomId}`);

      // Push a new message to the chat room
      const newChatroomRef = push(chatroomsRef);
  
      // Set the message data under the generated message ID
      await set(newChatroomRef, {
         
        name: user.displayName,
        text: confusionText,
        userID: user.uid,
        timestamp: serverTimestamp() // Use serverTimestamp for server-generated timestamp
      });

      setIsMessageSent(true);
      console.log("Message successfully sent to Firebase Realtime Database!");
    } catch (error) {
      console.error("Error sending message to Firebase Realtime Database: ", error);
    }
  };

  const handleDismiss = () => {
    setIsMessageSent(false); // Hide the message sent confirmation
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={closeModal}>X</button>
      
      <h2>This is a help video</h2>
      <div className="row ">
        <div className="col-12 col-md-8">
          {videoUrl && (
            <div className="video-container" style={{ marginBottom: '20px' }}>
              <video src={videoUrl} ref={videoRef} controls style={{ width: '150%'}} />
            </div>
      )}
        </div>
      </div>
      {!isConfused ? (
        <div className="row align-items-center mt-3">
          <div className="col">
            <h3>You can watch me play the dinosaur game for 30 seconds as an example video</h3>
          </div>
          <div className="col-auto">
            <button className="btn btn-warning" onClick={handleConfusedClick}>Confused</button>
          </div>
        </div>
      ) : (
        <div>
          <textarea type="text" className="form-control" style={{ width: '100%', height: '80px' }}  defaultValue={`I am confused at ${videoTime} seconds`} ref={textareaRef} />
          <div className="d-flex align-items-center mt-3"> 
            <button className="btn btn-primary me-2" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-success ms-2" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
       {/* Message sent confirmation popup */}
        {isMessageSent && (
          <div className="message-sent-popup">
            <p className="align-items-center">Message sent successfully!</p>
            <button className="btn btn-dismiss btn-primary " onClick={handleDismiss}>
              Dismiss
            </button>
          </div>
        )}
    </div>
  </div>
);
};

export default Modal;

