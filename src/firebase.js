// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7usJ7GWUau3n7CBGW2BbESD9gwR5G8rI",
  authDomain: "podcast-platform-c9fa5.firebaseapp.com",
  projectId: "podcast-platform-c9fa5",
  storageBucket: "podcast-platform-c9fa5.appspot.com",
  messagingSenderId: "201493237835",
  appId: "1:201493237835:web:d3f5e4e29f8f4f45283dce",
  measurementId: "G-0N9W424J9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage};
