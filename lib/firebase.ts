import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNb-IkMSZyKUTGKUm1o04LOVYUIwWpIPg",
  authDomain: "growtez-site.firebaseapp.com",
  projectId: "growtez-site",
  storageBucket: "growtez-site.firebasestorage.app",
  messagingSenderId: "850869009700",
  appId: "1:850869009700:web:5e2a87cbf44c3e8193c7b1",
  measurementId: "G-6K3K85SKYZ",
};

// Prevent re-initialisation on Next.js hot reloads
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
