// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0-Ec85lggMahMNQSqXkoezDqXqy4ak2I",
  authDomain: "bigdatapf-f73f4.firebaseapp.com",
  projectId: "bigdatapf-f73f4",
  storageBucket: "bigdatapf-f73f4.appspot.com",
  messagingSenderId: "599625969885",
  appId: "1:599625969885:web:c36434b15711e0323eab34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore  = getFirestore(app);