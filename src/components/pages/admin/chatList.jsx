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

  // Listen for changes in the chatrooms node
  onValue(chatroomsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Update the state with the chatrooms data
      setChatrooms(Object.keys(data));
    }
  });

  // Clean up the listener when component unmounts
  return () => {
    // Detach the listener to avoid memory leaks
    // It's important to remove the listener when it's no longer needed
    // This cleanup function runs when the component unmounts
    // This is a best practice to prevent memory leaks
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
                <div className="card h-100" onClick={() => handleClick(chatroomId)}>
                  <div className="card-body">
                    <h5 className="card-title text-center">{chatroomId}</h5>
                    {/* Render other content here */}
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