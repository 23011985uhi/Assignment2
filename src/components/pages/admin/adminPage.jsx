import  { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import ChatList from './chatList'
import Chats from './chats'
import { SelectedChatroomProvider } from './chatroomId';
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
          
          const chatroomIds = Object.keys(data);
          setChatrooms(chatroomIds);
        } else {
          setChatrooms([]); 
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

  
  
  return (
    <SelectedChatroomProvider>
      <div className="admin-modal" onClick={onClose}>
        <div className="admin-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn-admin" onClick={closeAdminPage}>X</button>
          <div className='container-fluid'>
            <div className='row h-100'>
              <div className='col-md-4 border-right'>
                <ChatList /> 
              </div>
            <div className='col-md-8'>
              <Chats /> 
            </div>
           </div> 
          </div>
        </div>
      </div>
    </SelectedChatroomProvider>
    );
}
export default AdminPage;