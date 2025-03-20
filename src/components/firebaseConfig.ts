// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDddW0Upgsf-Fn7RPfhbkD4nN02OiY7ksE",
  authDomain: "finlit-decba.firebaseapp.com",
  projectId: "finlit-decba",
  storageBucket: "finlit-decba.firebasestorage.app",
  messagingSenderId: "437459191136",
  appId: "1:437459191136:web:f3f07344632c1607d60a05",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
