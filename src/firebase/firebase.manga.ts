import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Manga } from "../models/manga";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const newMangaImage = async (info: Partial<Manga>, file?: File) => {
  console.log("Firebase test");
  if (!file) {
    info.image =
      "https://firebasestorage.googleapis.com/v0/b/add-image-9a3cd.appspot.com/o/Avatar.png?alt=media&token=912b2430-9291-4ca1-a75a-ac8b2a746d5a";
    return;
  }
  const storageRef = ref(storage, file.name);

  await uploadBytes(storageRef, file);

  const imgUrl = await getDownloadURL(storageRef);
  console.log({ imgUrl });
  return imgUrl;
};
