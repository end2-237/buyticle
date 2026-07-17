import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Analytics — only when supported (avoids noisy errors on some networks)
isSupported().then((ok) => { if (ok) { try { getAnalytics(app); } catch { /* ignore */ } } });

// Initialiser Auth et Firestore (long-polling auto-detect = fiable derrière les proxys)
const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
const storage = getStorage(app);

// Exporter les connexions
export { db, auth , storage};
