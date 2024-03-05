import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhWns2snFIZuQAtQP2ylzRi1XZLYacNYo",
  authDomain: "assignment2-23011985.firebaseapp.com",
  databaseURL: "https://assignment2-23011985-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "assignment2-23011985",
  storageBucket: "assignment2-23011985.appspot.com",
  messagingSenderId: "631527904522",
  appId: "1:631527904522:web:4b6c0d7922b5acb85c16f3",
  measurementId: "G-DHDMPEY7P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service

export const db = getFirestore(app);
export const auth = getAuth(app);



