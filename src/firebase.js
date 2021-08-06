import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp(
    {
        apiKey: "AIzaSyAsrBgAlVBfk5ersDeRI4LaLqyGGpuZHzM",
        authDomain: "xd-basic-chat-app.firebaseapp.com",
        projectId: "xd-basic-chat-app",
        storageBucket: "xd-basic-chat-app.appspot.com",
        messagingSenderId: "1047845607282",
        appId: "1:1047845607282:web:4cbd3a362102f626762feb"
    }
).auth();