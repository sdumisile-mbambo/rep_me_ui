// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firestoreAdmin = require('firebase-admin');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACNVLiTyPQ8ZAk36f1GmkdtFEP5ibck3Y",
    authDomain: "chefsonapp.firebaseapp.com",
    databaseURL: "https://chefsonapp.firebaseio.com",
    projectId: "chefsonapp",
    storageBucket: "chefsonapp.appspot.com",
    messagingSenderId: "393133162549",
    appId: "1:393133162549:web:eb5b7b91221908da81f17c"
  };

firestoreAdmin.initializeApp();


// Initialize Firebase
const webApp = initializeApp(firebaseConfig);
const chefsDb = getFirestore(webApp);

