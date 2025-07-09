
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function subscribeToNewsletter(email) {
  if (!email) return { success: false, error: "Email invalide" };

  try {
    await addDoc(collection(db, "Newsletter"), {
      email: email.toLowerCase(),
      subscribedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return { success: false, error };
  }
}
