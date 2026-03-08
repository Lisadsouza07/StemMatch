import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// You can either:
// 1. Set environment variables in a .env file (recommended)
// 2. Directly paste your config below

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate that configuration is set
if (
  firebaseConfig.apiKey.includes("YOUR_") ||
  firebaseConfig.projectId.includes("YOUR_")
) {
  console.warn(
    "⚠️ Firebase configuration is not set up. Please update src/config/firebase.js or create a .env file with your Firebase credentials."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

export default app;
