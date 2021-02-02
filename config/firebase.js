import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDK73SsIv-Ntti2A370XWXexNCo1UzhiSw",
    authDomain: "medbase-2c01c.firebaseapp.com",
    databaseURL: "https://medbase-2c01c-default-rtdb.firebaseio.com",
    projectId: "medbase-2c01c",
    storageBucket: "medbase-2c01c.appspot.com",
    messagingSenderId: "589420553068",
    appId: "1:589420553068:web:ea9f92cb26bec9ae47c949",
    measurementId: "G-W49LN6W11G"
  };
  
// if ( !firebase.apps.length ) {
//     firebase.initializeApp(firebaseConfig);
// }

export { firebaseConfig };