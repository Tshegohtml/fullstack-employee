const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const dotenv = require("dotenv");
const { getAuth } = require("firebase/auth");


dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyDxEXx5E13Cd1lLRDdcUyBcQHsw_1xopq8",
    authDomain: "employee-form-c6eea.firebaseapp.com",
    projectId: "employee-form-c6eea",
    storageBucket: "employee-form-c6eea.appspot.com",
    messagingSenderId: "305652184331",
    appId: "1:305652184331:web:628a3dd86c33a8be051e0e",
    measurementId: "G-ZBM0N0SW4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db,auth };
