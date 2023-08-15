// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDqCrU5BdgIvjpXkyAOSonfWuCsonAtkT8",
  authDomain: "echo-f5b65.firebaseapp.com",
  projectId: "echo-f5b65",
  storageBucket: "echo-f5b65.appspot.com",
  messagingSenderId: "345163862008",
  appId: "1:345163862008:web:ca59d8fc1bb35451a7500d",
  measurementId: "G-Z0JZ8LRXFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)