// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdM6nP-y2NXWn8ddNhvC4klaSNdLolF0c",
  authDomain: "recipy-b5990.firebaseapp.com",
  projectId: "recipy-b5990",
  storageBucket: "recipy-b5990.firebasestorage.app",
  messagingSenderId: "890666220508",
  appId: "1:890666220508:web:1432b4100f257aa7476d19",
  databaseURL: "https://recipy-b5990-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };