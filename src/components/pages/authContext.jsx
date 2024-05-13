import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);

      if (user) {
        const userEmail = user.email;
       // console.log(userEmail)
        const adminListRef = doc(db, 'Admins', 'adminlist');

        getDoc(adminListRef)
        .then(docSnapshot => {
          if (docSnapshot.exists()) {
            const admins = docSnapshot.data().admins; // Extract the 'admins' array field
            if (admins.includes(userEmail)) {
              setIsAdmin(true); // Set isAdmin to true if user's email is found in 'admins' array
            } else {
              setIsAdmin(false); // Set isAdmin to false if user's email is not found in 'admins' array
            }
          } else {
            setIsAdmin(false); // Set isAdmin to false if 'adminlist' document doesn't exist
          }
        })
        .catch(error => {
          console.error("Error checking admin status:", error);
        });
    }
  });

  return unsubscribe; 
}, []);
  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

