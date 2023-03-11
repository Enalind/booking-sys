import {initializeApp} from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREABASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

const firebaseConfig = {
    apiKey: "AIzaSyDUISKPg4mWVFmvuH_PgWgR_iFyiKfG42Q",
    authDomain: "booking-32922.firebaseapp.com",
    projectId: "booking-32922",
    storageBucket: "booking-32922.appspot.com",
    messagingSenderId: "1057868823401",
    appId: "1:1057868823401:web:722aadb8e6ea24ecce1bf8",
    measurementId: "G-RRY1MY481F"
  };

export const firebase = initializeApp(config);
export const firestore = getFirestore(firebase)
export const env = [config, firebaseConfig]
// export const analytics = getAnalytics(firebase);