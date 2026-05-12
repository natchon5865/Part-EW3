import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVPYOA1m7EcjVw0-Ext587FNABUdWHVVY",
  authDomain: "partew3.firebaseapp.com",
  projectId: "partew3",
  storageBucket: "partew3.firebasestorage.app",
  messagingSenderId: "749309281372",
  appId: "1:749309281372:web:a10ab877bee4bb9dc29299"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
