import './chatList.css'
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useSelectedChatroomId } from './chatroomId';

function ChatList({onChatroomClick}) {

const [chatrooms, setChatrooms] = useState([]);
const { selectedChatroomId,setSelectedChatroomId } = useSelectedChatroomId();

useEffect(() => {
  const db = getDatabase();
  const chatroomsRef = ref(db, 'Chats/generalvideo/chatrooms');

  
  onValue(chatroomsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      
      setChatrooms(Object.keys(data));
    }
  });

  
  return () => {
    
    off(chatroomsRef);
  };
}, [])



const handleClick = (chatroomId) => {
  setSelectedChatroomId(chatroomId);
  console.log(chatroomId)
};
  



    return(
      <div className='chat-list'>
      <div className='chat-list-item'>
        <h4 className='list-header'>This is the chat list</h4>
        <div className="list-content overflow-auto" style={{ maxHeight: '900px'}}>
          {chatrooms.map((chatroomId) => (
            <div key={chatroomId}  className={`row mb-4 justify-content-center ${selectedChatroomId === chatroomId ? 'selected' : ''}`}
            >
              <div className="col-10">
                <div className={`card h-100 ${selectedChatroomId === chatroomId ? 'selected-card' : ''}`} onClick={() => handleClick(chatroomId)}>
                  <div className="card-body">
                    <h5 className="card-title text-center">{chatroomId}</h5>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatList;