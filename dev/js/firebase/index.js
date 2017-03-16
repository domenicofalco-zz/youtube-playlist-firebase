import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAOkbSUodLjcjG6QY-DmJHvdxz2C1IFpis",
  authDomain: "youtube-playlist-1979d.firebaseapp.com",
  databaseURL: "https://youtube-playlist-1979d.firebaseio.com",
  storageBucket: "youtube-playlist-1979d.appspot.com",
  messagingSenderId: "531823099599"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
