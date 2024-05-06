/*from Russell Hunter to everyone:    8:11 PM
import { auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

from Russell Hunter to everyone:    8:11 PM
import { db } from './firebase'
import { collection, getDocs } from "firebase/firestore";

from Russell Hunter to everyone:    8:11 PM
const snapshot = await getDocs(collection(db, "Chats"));
    snapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });

    match /Chats/{chats} {
        allow read, write: if request.auth != null;
    }
    */