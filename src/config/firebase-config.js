import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDFOItVF1PtK9qRMOxdLmQMT4X5Lte2ivo",
    authDomain: "your-file-storage.firebaseapp.com",
    projectId: "your-file-storage",
    storageBucket: "your-file-storage.appspot.com",
    messagingSenderId: "41416140623",
    appId: "1:41416140623:web:59e33fcf411205c838073a",
    measurementId: "G-RN21WKQL0F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
