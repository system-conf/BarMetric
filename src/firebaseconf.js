// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAOe2nAVMwdHOR7jHqtYEaaTldD74fQdXc",
    authDomain: "barmen-3ecea.firebaseapp.com",
    databaseURL: "https://barmen-3ecea-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "barmen-3ecea",
    storageBucket: "barmen-3ecea.appspot.com",
    messagingSenderId: "977466560954",
    appId: "1:977466560954:web:fd0a6681d83c471d518d83",
    measurementId: "G-42T80Z49EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;