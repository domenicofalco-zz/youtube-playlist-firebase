// dependencies
import React from 'react';
import * as firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();

    this.databaseRef = null;
    this.state = { value: '' };
  }

  FBlogIn(e) {
    e.preventDefault();

    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;
      const userId = user.uid;

      this.databaseRef = firebase.database().ref('users/' + userId);
      this.databaseRef.on('value', gotData, gotError);

      function gotData(data) {
        console.log('got data');
        console.log(data.val());
      }
      function gotError(data) {
        console.log(data);
      }

    }).catch(function(error) {
      const errorMessage = error.message;
      const credential = error.credential;
      console.log('errorMessage', errorMessage);
    });

  }

  FBlogOut(e) {
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      console.log('logged out!');
    }).catch(function(error) {
      console.log(error);
    });
  }

  submit(e) {
    e.preventDefault();
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).set({
      ciaoneone: this.state.value
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.submit(e)}>
        <a href='#' onClick={e => this.FBlogIn(e)}>fb login</a><br />
        <a href='#' onClick={e => this.FBlogOut(e)}>fb logout</a><br />
        <input type='text' value={this.state.value} onChange={e => this.setState({value: e.target.value})} />
      </form>
    )
  }
}

export default App;
