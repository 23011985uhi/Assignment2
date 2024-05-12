import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const ChatComponent = ({ chatRoomId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    const db = getDatabase();
    const chatRoomRef = ref(db, `Chats/generalvideo/chatrooms/${chatRoomId}/messages`);

    unsubscribe = onValue(chatRoomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object of messages to an array
        const messageArray = Object.values(data);
        setMessages(messageArray);
      } else {
        setMessages([]); // If no messages exist, set empty array
      }
    }, (error) => {
      console.error('Error fetching messages:', error);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  return (
    <div>
      {/* Render messages here */}
      {messages.map((message, index) => (
        <div key={index}>
          {/* Render each message */}
          <p>{message.text}</p>
          {/* Render additional message details */}
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;