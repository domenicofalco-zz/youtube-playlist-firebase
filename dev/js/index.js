import React from 'react';
import ReactDOM from 'react-dom';
import firebaseApp from './firebase';

import App from './app';

firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {
    console.log('signed in');
  } else {
    console.log('not logged int');
  }
})

ReactDOM.render(<App />, document.getElementById('YoutubePlaylist'));
