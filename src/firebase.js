import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD71SUNYV03R_uvuV5ytK3RmDCvPQqBD8o",
  authDomain: "diana-y-gabriel.firebaseapp.com",
  projectId: "diana-y-gabriel",
  storageBucket: "diana-y-gabriel.firebasestorage.app",
  messagingSenderId: "322462006799",
  appId: "1:322462006799:web:24c5be1a8056859e502d7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

const firebaseUrl = "https://invitaciones-55c1a.firebaseio.com"; // Reemplaza con tu URL de Firebase
const apiKey = "AIzaSyDKoJ7TPLSXJGM5zr19LnTmgRiCxKLU4PI"; // Reemplaza con tu API Key de Firebase
