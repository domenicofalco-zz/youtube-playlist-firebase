// dependencies
import React from 'react';
import * as firebase from 'firebase';
// import firebaseApp from './firebase/config';
import firebaseApp from './firebase';

const provider = new firebase.auth.FacebookAuthProvider();


class App extends React.Component {
  constructor() {
    super();

    this.databaseRef = null;
    this.userID = null;
    this.state = {
      dbStorage: [],
      value: '',
      userData: {}
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if(user) {
        this.userID = user.uid;
        this.setState({
          userData: {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          }
        })
        this.loadDB();
      } else {
        console.log('not logged int');
      }
    });
  }

  loadDB() {
    if(this.userID) {
      const getData = (data) => {
        console.log('this is from firebase DB ->', data.val());

        this.setState({
          dbStorage: data.val().dbValueTest
        })
      };

      const dbError = (error) => {
        console.warn('firebase DB Error ->', error);
      };

      this.databaseRef = firebaseApp.database().ref('users/' + this.userID);
      this.databaseRef.on('value', getData, dbError);
    }
  }

  FBlogIn(e) {
    e.preventDefault();

    firebaseApp.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken;
      const user = result.user;
      this.userID = user.uid;

      this.loadDB();

      this.setState({
        userData: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }
      });

    }).catch((error) => {
      const errorMessage = error.message;
      const credential = error.credential;
      console.log('Login Error ->', errorMessage);
    });

  }

  FBlogOut(e) {
    e.preventDefault();
    firebaseApp.auth().signOut().then(() => {
      this.setState({
        userData: {}
      });
      this.userID = null;
      console.log('You have just logged out!');
    }).catch((error) => {
      console.log('Logout error ->', error);
    });
  }

  saveInDB(e) {
    e.preventDefault();

    this.setState({
      dbStorage: [this.state.value].concat(this.state.dbStorage),
      value: ''
    }, () => {
      console.log(this.userID);
      firebaseApp.database().ref('users/' + this.userID).set({
        dbValueTest: this.state.dbStorage
      });
    });
  }

  render() {
    return (
      <div>
      {Object.keys(this.state.userData).length !== 0 &&
        <section>
          <h2>User Info</h2>
          <img src={this.state.userData.photo} /><br />
          <span>Name: {this.state.userData.name}</span><br />
          <span>Email: {this.state.userData.email}</span>
          <br /><br />
        </section>
      }

        <form onSubmit={(e) => this.saveInDB(e)}>
          <a href='#' onClick={e => this.FBlogIn(e)}>fb login</a><br />
          <a href='#' onClick={e => this.FBlogOut(e)}>fb logout</a><br /><br />

          <label>type & press enter to save in DB</label><br />
          <input type='text' value={this.state.value} onChange={e => this.setState({value: e.target.value})} />
        </form>

        {this.state.dbStorage &&
          <div>
            <h3>From DB</h3>
            {this.state.dbStorage.map((e, i) => {
              return (<p key={i}>{e}</p>)
            })}
          </div>
        }

        {this.state.dbStorage.length === 0 &&
          <span>you must login</span>
        }
      </div>
    )
  }
}

export default App;
