import { createContext, useContext, useState } from 'react';

const SelectedChatroomContext = createContext(null);

export const useSelectedChatroomId = () => useContext(SelectedChatroomContext);

export const SelectedChatroomProvider = ({ children }) => {
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);

  return (
    <SelectedChatroomContext.Provider value={{ selectedChatroomId, setSelectedChatroomId }}>
      {children}
    </SelectedChatroomContext.Provider>
  );
};