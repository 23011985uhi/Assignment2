import './chats.css'
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push , set} from "firebase/database";
import { useSelectedChatroomId } from './chatroomId';
import { useAuth } from '../authContext';

function Chats({selectedChatroom}) {
  const { selectedChatroomId } = useSelectedChatroomId();
  const [chatContent, setChatContent] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (selectedChatroomId) {
      const db = getDatabase();
      const chatroomRef = ref(db, `Chats/generalvideo/chatrooms/${selectedChatroomId}`);

      
      const unsubscribe = onValue(chatroomRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          
          setChatContent(Object.values(data));
          console.log(data);
        }
      });

      
      return () => {
        
        
        
      };
    }
  }, [selectedChatroomId]);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const db = getDatabase();
      const messageKey = push(ref(db, `Chats/generalvideo/chatrooms/${selectedChatroomId}`)).key;
      const messageRef = ref(db, `Chats/generalvideo/chatrooms/${selectedChatroomId}/${messageKey}`);
      const newMessage = {
        text: messageInput,
        userID: user.uid,
        name: user.displayName,
        timestamp: new Date().toString()
      };
      setChatContent([...chatContent, newMessage]); 
      setMessageInput(''); 
      set(messageRef, newMessage); 
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    <div className='d-flex flex-column' style={{ height: '100%' }}>
    <div className='flex-grow-1'>
      <h4 className='chat-header'>This is the chat</h4>
      <div className="chat-content">
        
        <div className="chats">
      {chatContent.map((message, index) => (
        <div key={index} className={`chat-bubble ${message.userID === user.uid ? 'sent' : 'received'}`}>
          <p>{message.text}</p>
          <span className="timestamp"> Sent by {message.name} at {formatTimestamp(message.timestamp)}</span>
          
        </div>
      ))}
      </div>
      </div>
    </div>
    <div>
      
      <textarea 
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message..."
        rows={4}
        className="form-control mb-2"
      />
      
      <button className="btn btn-primary" onClick={sendMessage}>
        Send
      </button>
    </div>
    {isModalOpen && (
        <div className="faq-modal">
          <div className="faq-content small-modal">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Save to FAQ?</p>
            <div>
              <button onClick={closeModal}>No</button>
              <button onClick={() => console.log("Saved to FAQ")}>Yes</button>
            </div>
          </div>
        </div>
      )}
  </div>
);
}

export default Chats;