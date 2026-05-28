import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGqw4bv4gas-Og87Hhf1lXedzL20hVfHs",
  authDomain: "interntrack-5009e.firebaseapp.com",
  projectId: "interntrack-5009e",
  storageBucket: "interntrack-5009e.firebasestorage.app",
  messagingSenderId: "550341042296",
  appId: "1:550341042296:web:5380c7a6b9a21fef844d8d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };