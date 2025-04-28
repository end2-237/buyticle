import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getAllPlans() {
  const plansCol = collection(db, "Plans");
  const planSnapshot = await getDocs(plansCol);
  const planList = planSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return planList;
}
