import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createUserAndStore({ email, password, firstName, lastName, userName, profilePicture, phoneNumber, userType, shopName, sellerType, categories }) {
  const auth = getAuth();

  // 1. Créer l’utilisateur Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2. Créer doc user dans Firestore
  await addDoc(collection(db, "users"), {
    Email: email,
    FirstName: firstName,
    LastName: lastName,
    PhoneNumber: phoneNumber,
    ProfilePicture: profilePicture,
    UserName: userName,
    UserType: userType,
    IdUser: user.uid,
  });

  // 3. Créer doc boutique store dans Firestore
  await addDoc(collection(db, "store"), {
    ActivityType: sellerType,
    AnnualBalance: 120000,
    IdUser: user.uid,
    IsFeatured: true,
    MountBalance: 20000,
    Name: shopName,
    Products: [], // si t’as une liste produits, tu peux la mettre ici
    Subscription: "none",
    Categories: categories, // Ajout catégorie si tu veux stocker ça
  });

  return user;
}
