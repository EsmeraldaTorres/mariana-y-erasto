import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKoJ7TPLSXJGM5zr19LnTmgRiCxKLU4PI",
  authDomain: "invitaciones-55c1a.firebaseapp.com",
  projectId: "invitaciones-55c1a",
  storageBucket: "invitaciones-55c1a.appspot.com",
  messagingSenderId: "673447605232",
  appId: "1:673447605232:web:470f34d96576c11ddca335",
  measurementId: "G-8QXEG9TV1Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

const firebaseUrl = "https://invitaciones-55c1a.firebaseio.com"; // Reemplaza con tu URL de Firebase
const apiKey = "AIzaSyDKoJ7TPLSXJGM5zr19LnTmgRiCxKLU4PI"; // Reemplaza con tu API Key de Firebase
