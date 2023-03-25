import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLm-Bui6vn6coGj20ASmFqmdnicsFIuJY",
    authDomain: "crush-4c528.firebaseapp.com",
    projectId: "crush-4c528",
    storageBucket: "crush-4c528.appspot.com",
    messagingSenderId: "621870853058",
    appId: "1:621870853058:web:1a9790e67fe167c077845b"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);