import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, update} from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsc_ZVxBuhLfKhjkeCtMLFnfk1tb6FOk0",
  authDomain: "cool-fashion-85a8e.firebaseapp.com",
  databaseURL: "https://cool-fashion-85a8e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cool-fashion-85a8e",
  storageBucket: "cool-fashion-85a8e.firebasestorage.app",
  messagingSenderId: "527073420331",
  appId: "1:527073420331:web:f60f05f3cb42f5eb55366e"
};

const app = initializeApp(firebaseConfig);
const dbRealTime = getDatabase(app);
const firestoreDB = getFirestore(app)


export {dbRealTime, firestoreDB, ref , push, get, update}