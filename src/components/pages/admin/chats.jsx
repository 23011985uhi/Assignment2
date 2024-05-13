import './chats.css'
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useSelectedChatroomId } from './chatroomId';
import { useAuth } from '../authContext';

function Chats({selectedChatroom}) {
  const { selectedChatroomId } = useSelectedChatroomId();
  const [chatContent, setChatContent] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (selectedChatroomId) {
      const db = getDatabase();
      const chatroomRef = ref(db, `Chats/generalvideo/chatrooms/${selectedChatroomId}`);

      // Listen for changes in the selected chatroom
      const unsubscribe = onValue(chatroomRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Update the state with the chatroom content
          setChatContent(Object.values(data));
          console.log(data);
        }
      });

      // Clean up the listener when component unmounts or chatroom changes
      return () => {
        // Detach the listener to avoid memory leaks
        
        
      };
    }
  }, [selectedChatroomId]);



  return(
    <div className='d-flex flex-column' style={{ height: '100%' }}>
    <div className='flex-grow-1'>
      <h4 className='chat-header'>This is the chat</h4>
      <div className="chat-content">
        {/* Render chat messages here */}
        <div className="chats">
      {chatContent.map((message, index) => (
        <div key={index} className={`chat-bubble ${message.userID === user.uid ? 'sent' : 'received'}`}>
          <p>{message.text}</p>
          <span className="timestamp"> Sent by {message.name} at {message.timestamp}</span>
        </div>
      ))}
      </div>
      </div>
    </div>
    <div>
      {/* Textarea for typing messages */}
      <textarea 
        
        
        placeholder="Type your message..."
        rows={4}
        className="form-control mb-2"
      />
      {/* Send button */}
      <button 
        
        className="btn btn-primary"
      >
        Send
      </button>
    </div>
  </div>
);
}

export default Chats;