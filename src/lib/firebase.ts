// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbL_QpGWq8N6mtLykQFIQWEfb1BF4r59M",
  authDomain: "workout-tracker-7ec51.firebaseapp.com",
  projectId: "workout-tracker-7ec51",
  storageBucket: "workout-tracker-7ec51.firebasestorage.app",
  messagingSenderId: "291603222546",
  appId: "1:291603222546:web:f759aca5da22f18790c8cb",
  measurementId: "G-NXL27H8FW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export Authentication
export const auth = getAuth(app);
// Export analytics only if running in the browser
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;