import firebase from 'firebase'
import config from './config/firebaseConfig'

export default () => firebase.initializeApp(config);

export const tryFirebase = () => {
  // How to create user
  firebase.auth().createUserWithEmailAndPassword(
    'figunka@gmail.com',
    'test1234'
  );

  // How to sign in
  firebase.auth().signInWithEmailAndPassword(
    'figunka@gmail.com',
    'test1234'
  ).then(
    result => console.log(result.user.email)
  ).catch(
    error => console.log(error.message)
  );

  // How to sign out
  firebase.auth().signOut();

  // How to listen to auth state change
  firebase.auth().onAuthStateChanged(
    user => {
      console.log(user && user.email)
    }
  )
};
