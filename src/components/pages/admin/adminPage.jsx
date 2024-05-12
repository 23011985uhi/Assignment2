import  { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import {ChatComponent} from '../chatPage'
import './adminPage.css'

function AdminPage({ isOpen, onClose }) {
  
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};

    if (isOpen) {
      const db = getDatabase();
      const chatroomsRef = ref(db, 'Chats/generalvideo/chatrooms');

      unsubscribe = onValue(chatroomsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert object of chatrooms to an array of chatroom IDs
          const chatroomIds = Object.keys(data);
          setChatrooms(chatroomIds);
        } else {
          setChatrooms([]); // If no chatrooms exist, set empty array
        }
      }, (error) => {
        console.error('Error fetching chatrooms:', error);
      });
    }

    return () => unsubscribe();
  }, [isOpen])


  if (!isOpen) return null;

  const closeAdminPage = () => {
    onClose();
  };

  const handleChatroomClick = (chatroomId) => {
    setSelectedChatroom(chatroomId);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeAdminPage}>X</button>
        <h2>Admin Content</h2>
        
        <div className="row justify-content-center">
          {chatrooms.map((chatroomId) => (
            <div key={chatroomId} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100" onClick={() => handleChatroomClick(chatroomId)}>
                <div className="card-body">
                  <h5 className="card-title text-center">{chatroomId}</h5>
                  {/* Additional fields can be rendered here */}
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedChatroom && (
          <ChatComponent chatRoomId={selectedChatroom} />
        )}
      </div>
    </div>
  );
}
export default AdminPage;