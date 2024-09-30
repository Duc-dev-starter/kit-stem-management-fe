import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVfIRingd9YAfSxt5j9xAEbdrnzgLuGJs",
  authDomain: "kit-stem.firebaseapp.com",
  projectId: "kit-stem",
  storageBucket: "kit-stem.appspot.com",
  messagingSenderId: "17970827588",
  appId: "1:17970827588:web:9cc83306aeba07033f8711",
  measurementId: "G-790S16QJZ4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
