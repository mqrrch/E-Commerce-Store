// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX3m3sUniSTTgP65wBAfOpl8REQDGD--U",
  authDomain: "e-commerce-store-48e50.firebaseapp.com",
  projectId: "e-commerce-store-48e50",
  storageBucket: "e-commerce-store-48e50.firebasestorage.app",
  messagingSenderId: "616015312615",
  appId: "1:616015312615:web:1470193e67df1633105442",
  measurementId: "G-VBRNDMB4G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);