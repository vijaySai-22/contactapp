import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7WsZ7YrG1hUqC5GNuB7jWAE_BrNtgZkQ",
  authDomain: "contactapp-e8d1e.firebaseapp.com",
  databaseURL: "https://contactapp-e8d1e-default-rtdb.firebaseio.com",
  projectId: "contactapp-e8d1e",
  storageBucket: "contactapp-e8d1e.appspot.com",
  messagingSenderId: "25422118226",
  appId: "1:25422118226:web:a12b53cbe64a8a9f11ce8b"
};

const app= initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore();