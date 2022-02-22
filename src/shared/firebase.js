import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKID6d19YTj_TKMsygwoaxKCpi8TktyOU",
  authDomain: "reactweek2-1161e.firebaseapp.com",
  projectId: "reactweek2-1161e",
  storageBucket: "reactweek2-1161e.appspot.com",
  messagingSenderId: "87127436567",
  appId: "1:87127436567:web:c78fde668001d85eb71b52",
  measurementId: "G-TES4LMJ7TC"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
export{auth, apiKey, firestore, storage, realtime, firebase};