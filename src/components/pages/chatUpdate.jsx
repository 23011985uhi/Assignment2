
import ChatList from './admin/chatList';
import Chats from './admin/chats';
import { SelectedChatroomProvider } from './admin/chatroomId';
import './chatUpdate.css'; 

function ChatUpdate({ onClose }) {
  const closeChatUpdate = () => {
    onClose();
  };

  return (
    <SelectedChatroomProvider>
      <div className="chat-update-modal" onClick={onClose}>
        <div className="chat-update-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={closeChatUpdate}>X</button>
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

export default ChatUpdate;