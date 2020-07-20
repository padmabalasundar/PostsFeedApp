import * as firebase from 'firebase'
import "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC2yb6hwGG7TxEzPxiobeCp9174byI51os",
    authDomain: "mypostfeed.firebaseapp.com",
    databaseURL: "https://mypostfeed.firebaseio.com",
    projectId: "mypostfeed",
    storageBucket: "mypostfeed.appspot.com",
    messagingSenderId: "443593035783",
    appId: "1:443593035783:web:677b300fedd6e4c7a71aa2",
    measurementId: "G-ZRLSTJRX3E"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const firestoreDB = firebaseApp.firestore()
  
  //To fix the Issue with the latest version of firestore (7.16.0)  - https://github.com/firebase/firebase-js-sdk/issues/2923
firestoreDB.settings({ experimentalForceLongPolling: true })
