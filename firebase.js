// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBewpq8a03NPfXdL0yr5esoGHb0cPcHtDU",
    authDomain: "signal-a0f20.firebaseapp.com",
    projectId: "signal-a0f20",
    storageBucket: "signal-a0f20.appspot.com",
    messagingSenderId: "550488763881",
    appId: "1:550488763881:web:3b7e7d7f6a80803fa06f78"
};

// Initialize Firebase
let app;

if(firebase.apps.length==0){
app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth()

export {db , auth};