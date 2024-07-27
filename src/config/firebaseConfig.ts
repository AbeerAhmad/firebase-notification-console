// src/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Connect to Firestore Emulator if running in development mode
if (process.env.REACT_APP_NODE_ENV === 'development') {
  console.log('used dev mode.....',process.env.REACT_APP_NODE_ENV);
  
  const firestoreEmulatorHost = process.env.REACT_APP_FIRESTORE_EMULATOR_HOST || 'localhost';
  const firestoreEmulatorPort = process.env.REACT_APP_FIRESTORE_EMULATOR_PORT || '8080';
  connectFirestoreEmulator(firestore, firestoreEmulatorHost, parseInt(firestoreEmulatorPort, 10));
  
  const authEmulatorHost = process.env.REACT_APP_AUTH_EMULATOR_HOST || 'localhost';
  const authEmulatorPort = process.env.REACT_APP_AUTH_EMULATOR_PORT || '9099';
  connectAuthEmulator(auth, `http://${authEmulatorHost}:${authEmulatorPort}`);
}

export const googleProvider = new GoogleAuthProvider();

