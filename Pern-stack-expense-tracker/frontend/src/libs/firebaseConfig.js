// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4bE31TgwptVDJ5z1SxpFfvi6gKCCRTv4",
  authDomain: "pern-stack-ae99b.firebaseapp.com",
  projectId: "pern-stack-ae99b",
  storageBucket: "pern-stack-ae99b.firebasestorage.app",
  messagingSenderId: "1029402442773",
  appId: "1:1029402442773:web:f48c08d80111e5f162e21c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth,app }; // Export the auth object