// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1nK4ElSxWyXm-2cK9k8O1wahOBmOdzak",
  authDomain: "expense-tracker-9ae9b.firebaseapp.com",
  projectId: "expense-tracker-9ae9b",
  storageBucket: "expense-tracker-9ae9b.appspot.com",
  messagingSenderId: "976413146032",
  appId: "1:976413146032:web:d9afdd5e3e0fe026cf7475"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

