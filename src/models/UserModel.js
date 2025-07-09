import { collection, getDocs, query, limit, getCountFromServer, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// Récupérer tous les utilisateurs
export async function getAllUsers() {
  const usersCol = collection(db, "Users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return userList;
}

// Récupérer seulement les 3 premiers utilisateurs
export async function getThreeUsers() {
  const usersCol = collection(db, "Users");
  const q = query(usersCol, limit(3));
  const userSnapshot = await getDocs(q);
  const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return userList;
}

// Récupérer uniquement le nombre total d'utilisateurs
export async function getUsersCount() {
  const usersCol = collection(db, "Users");
  const snapshot = await getCountFromServer(usersCol);
  return snapshot.data().count;
}
