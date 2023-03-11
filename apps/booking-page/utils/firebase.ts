import {initializeApp} from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from "firebase/storage"

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREABASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
}



export const firebase = initializeApp(config);
export const firestore = getFirestore(firebase)
export const storage = getStorage(firebase)
// export const analytics = getAnalytics(firebase);