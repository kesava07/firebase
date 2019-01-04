import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyA3rW_KtCkk7zY_Gn-DPfW3ubYdjyJ7VIc",
    authDomain: "complete-auth-99ccf.firebaseapp.com",
    databaseURL: "https://complete-auth-99ccf.firebaseio.com",
    projectId: "complete-auth-99ccf",
    storageBucket: "complete-auth-99ccf.appspot.com",
    messagingSenderId: "323709380193"
  };
  firebase.initializeApp(config);

  export default firebase;