// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const database = getDatabase(app);

// module.exports = { database: database };
export { database };
