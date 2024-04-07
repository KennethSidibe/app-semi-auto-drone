import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6Ds2kua4BEzekv2UxAIwGkN2T7wV4zcs",
    authDomain: "semi-autonomous-drone.firebaseapp.com",
    projectId: "semi-autonomous-drone",
    storageBucket: "semi-autonomous-drone.appspot.com",
    messagingSenderId: "878027561275",
    appId: "1:878027561275:web:2f23ba58a6cb0fcf9d3f1e",
    measurementId: "G-PBS9KJBEFB"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  export const db = getFirestore(firebaseApp);
  export const auth = getAuth(firebaseApp);