import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyC-DWJHDADO3pCKxGj2xPYWnE7a1U0R0Bk",
  authDomain: "social-media-f096c.firebaseapp.com",
  projectId: "social-media-f096c",
  storageBucket: "social-media-f096c.appspot.com",
  messagingSenderId: "212830372038",
  appId: "1:212830372038:web:7c9ed78e85f3f4f25fd7c7"
};

firebase.initializeApp(firebaseConfig);

export default firebase;