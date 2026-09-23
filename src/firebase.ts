import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQKLM92UMnSb_ZLd7BZGgH6TNP9ugXffg",
  authDomain: "atlantix2k26.firebaseapp.com",
  projectId: "atlantix2k26",
  storageBucket: "atlantix2k26.firebasestorage.app",
  messagingSenderId: "988770007742",
  appId: "1:988770007742:web:742114c6f386a0422fbcef",
  measurementId: "G-7FS0P2BJV7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
