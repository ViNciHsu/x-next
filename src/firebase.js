// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-v2-38926.firebaseapp.com",
  projectId: "x-next-v2-38926",
  storageBucket: "x-next-v2-38926.appspot.com",
  messagingSenderId: "331728530259",
  appId: "1:331728530259:web:6d06346f2362d8cde18fa6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);