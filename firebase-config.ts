import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA05Reo8RW7DCz-8Wo1D9XFdo1uDkYVua8",
  authDomain: "webskiter-f5c32.firebaseapp.com",
  databaseURL: "https://webskiter-f5c32-default-rtdb.firebaseio.com",
  projectId: "webskiter-f5c32",
  storageBucket: "webskiter-f5c32.appspot.com",
  messagingSenderId: "93033600660",
  appId: "1:93033600660:web:74ffa4a4fe8d19fee44681",
  measurementId: "G-ZQDWCT0SPX",
};
let app: firebase.FirebaseApp; 
if (firebase.getApps().length) {
  app = firebase.getApp();
} else {
  app = firebase.initializeApp(firebaseConfig);
}
const auth = getAuth(app);
export { app,auth  };
