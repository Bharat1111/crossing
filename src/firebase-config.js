import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBa1vmFrdgp9v-4EC1-FBeXHevt2kld2_A",
    authDomain: "smart-level-crossing.firebaseapp.com",
    databaseURL:
        "https://smart-level-crossing-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-level-crossing",
    storageBucket: "smart-level-crossing.appspot.com",
    messagingSenderId: "410923569143",
    appId: "1:410923569143:web:15b799079d4ce2c10f28f2",
    measurementId: "G-TQBHDMKGGS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig, "sendData");
const database = getDatabase(app);
export const db = getFirestore(app);
export { database };
