import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAX7RhZr9bERxbUQ4X2497qQs7MFqpNJwE",
    authDomain: "selfstarter-4720cki.firebaseapp.com",
    databaseURL: "https://selfstarter-4720cki.firebaseio.com",
    projectId: "selfstarter-4720cki",
    storageBucket: "selfstarter-4720cki.appspot.com",
    messagingSenderId: "881677061805",
    appId: "1:881677061805:web:363f3ecef7e8823b6e8024",
    measurementId: "G-J60CKP58KH"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };