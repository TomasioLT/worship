// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf3wO1FDybep-MpaLuETr6_8o_faK9THk",
  authDomain: "react-firebase-auth-f9f08.firebaseapp.com",
  projectId: "react-firebase-auth-f9f08",
  storageBucket: "react-firebase-auth-f9f08.appspot.com",
  messagingSenderId: "973469245824",
  appId: "1:973469245824:web:013020c4bddfa1ef88a165",
  measurementId: "G-H9MXKK1XQE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
