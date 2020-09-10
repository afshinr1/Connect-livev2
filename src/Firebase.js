import * as firebase from "firebase";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAIvEW0LLIsxrSYF6b4t0-IZI3Z31DGL6Y",
  authDomain: "connect-live-d9864.firebaseapp.com",
  databaseURL: "https://connect-live-d9864.firebaseio.com",
  projectId: "connect-live-d9864",
  storageBucket: "connect-live-d9864.appspot.com",
  messagingSenderId: "955825189474",
  appId: "1:955825189474:web:19b6c31a76753d613cd73b",
  measurementId: "G-4MLV5S0C95",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
