// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO0IEjzXakj-Tcw98YvM3jFrPxvNcO0RA",
  authDomain: "dinner-model-27b5f.firebaseapp.com",
  databaseURL: "https://dinner-model-27b5f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dinner-model-27b5f",
  storageBucket: "dinner-model-27b5f.appspot.com",
  messagingSenderId: "35190603078",
  appId: "1:35190603078:web:2756c8fce5274a9ba5b947",
  measurementId: "G-VZ863MBFZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);