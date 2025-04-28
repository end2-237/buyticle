// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <<== AJOUTER ÇA !!

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDZboqSBZpZqQhP4QdXEnY9QDICMIQO0A",
  authDomain: "buyticle-bce3f.firebaseapp.com",
  projectId: "buyticle-bce3f",
  storageBucket: "buyticle-bce3f.firebasestorage.app",
  messagingSenderId: "313383491173",
  appId: "1:313383491173:web:ed31f670800661f90f188c",
  measurementId: "G-G95BL83QGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Créer la connexion à Firestore
const db = getFirestore(app);

// Exporter la connexion Firestore
export { db };
