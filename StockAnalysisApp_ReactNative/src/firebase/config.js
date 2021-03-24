import * as firebase from "firebase";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgmWB4KOTl08uhWaJnJ605eh0SzhBTBn4",
  authDomain: "stock-app-13e49.firebaseapp.com",
  projectId: "stock-app-13e49",
  storageBucket: "stock-app-13e49.appspot.com",
  messagingSenderId: "556499727946",
  appId: "1:556499727946:web:3499a0a97a7c11268c98b3",
  measurementId: "G-WC0HL30RE4",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
