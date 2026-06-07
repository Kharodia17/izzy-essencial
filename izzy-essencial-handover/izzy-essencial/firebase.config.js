// src/firebase/config.js
// Replace all placeholder values with your Firebase project credentials
// Get these from: Firebase Console → Project Settings → Your Apps → Web App

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",
  authDomain:        "izzy-essencial.firebaseapp.com",
  projectId:         "izzy-essencial",
  storageBucket:     "izzy-essencial.appspot.com",
  messagingSenderId: "REPLACE_WITH_SENDER_ID",
  appId:             "REPLACE_WITH_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db      = getFirestore(app);
export const auth    = getAuth(app);
export const storage = getStorage(app);

export default app;
