import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnjroTIEiDMR8is__bcgQsqqb-aHbQYAI",
  authDomain: "todo-app-52869.firebaseapp.com",
  projectId: "todo-app-52869",
  storageBucket: "todo-app-52869.appspot.com",
  messagingSenderId: "1077805568336",
  appId: "1:1077805568336:web:cf197747dce6e642d19c55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export { app, auth , db};
