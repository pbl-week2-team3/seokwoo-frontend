import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  // 인증정보!
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();

export{auth, apiKey};