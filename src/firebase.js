import { getAuth } from "firebase/auth"; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDZboqSBZpZqQhP4QdXEnY9QDICMIQO0A",
  authDomain: "buyticle-bce3f.firebaseapp.com",
  projectId: "buyticle-bce3f",
  storageBucket: "buyticle-bce3f.firebasestorage.app",
  messagingSenderId: "313383491173",
  appId: "1:313383491173:web:ed31f670800661f90f188c",
  measurementId: "G-G95BL83QGL"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialiser Auth et Firestore
const auth = getAuth(app); 
const db = getFirestore(app);

// Exporter les connexions
export { db, auth };
