import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // setDoc pour ID contrôlé
import { db } from "../firebase";

export async function createUserAndStore({
  email,
  password,
  firstName,
  lastName,
  userName,
  profilePicture,
  phoneNumber,
  userType,
  shopName,
  sellerType,
  categories,
}) {
  try {
    const auth = getAuth();

    // 1. Créer l’utilisateur Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;

    // 2. Créer doc utilisateur avec ID connu
    await setDoc(doc(db, "Users", userId), {
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      PhoneNumber: phoneNumber,
      ProfilePicture: profilePicture,
      UserName: userName,
      UserType: userType,
      IdUser: userId,
      CreatedAt: new Date(),
    });

    // 3. Créer doc boutique avec ID généré auto
    await setDoc(doc(db, "Store", userId), {
      ActivityType: sellerType,
      AnnualBalance: 0,
      IdUser: userId,
      IsFeatured: true,
      MountBalance: 0,
      Name: shopName,
      Products: [],
      Subscription: "none",
      Categories: categories,
      CreatedAt: new Date(),
    });

    console.log("✅ Utilisateur et boutique créés avec succès");
    return user;
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}
