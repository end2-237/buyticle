// helpers/uploadImage.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImageToFirebase = async (file, path = "Products") => {
  const filename = `${path}/${Date.now()}_${file.name}`;
  const imageRef = ref(storage, filename);
  const snapshot = await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
