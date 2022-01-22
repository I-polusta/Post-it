import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyAclkgKvE8BJodMfNCCHGWI1ksR6gHkE28",
  authDomain: "post-it-f4b29.firebaseapp.com",
  projectId: "post-it-f4b29",
  storageBucket: "post-it-f4b29.appspot.com",
  messagingSenderId: "1006257383308",
  appId: "1:1006257383308:web:f7b6ca4f3451810ad2d8a9",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();
export { auth, provider };
export { firebaseConfig, storage };
export default db;
