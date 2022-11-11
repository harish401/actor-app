

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnA0kTngB2H-etfbhWzsyhjUciib1LVGk",
  authDomain: "eoe-itinerary.firebaseapp.com",
  databaseURL: "https://eoe-itinerary-default-rtdb.firebaseio.com",

  projectId: "eoe-itinerary",
  storageBucket: "eoe-itinerary.appspot.com",
  messagingSenderId: "1016473402081",
  appId: "1:1016473402081:web:73a3d03605341b7ae155a0",
  measurementId: "G-CDRS0ZQZGC"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}