import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp(
    {
        apiKey: process.env.REACT_APP_FIREBASE_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
        appId: process.env.REACT_APP_FIREBASE_APP
    }
).auth();