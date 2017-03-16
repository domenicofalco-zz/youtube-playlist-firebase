import * as firebase from 'firebase';

const config = {
  apiKey: "your apiKey",
  authDomain: "your authDomain",
  databaseURL: "your databaseURL",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
