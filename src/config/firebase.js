import firebase from "firebase/compat/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtWqXbMqpPelYosrHF5TZOqi4ENWYZzkg",
  authDomain: "form-clone-f685a.firebaseapp.com",
  databaseURL: "https://form-clone-f685a-default-rtdb.firebaseio.com/",
  projectId: "form-clone-f685a",
  storageBucket: "form-clone-f685a.appspot.com",
  messagingSenderId: "966604364066",
  appId: "1:966604364066:web:cf33fcf76da58bc8372d7b",
  measurementId: "G-S3RR1WMXDB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// sign in
export const signInToDatabase = (email, password) =>
  new Promise((resolve, reject) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error))
  );

// sign up
export const signUpToDatabase = (email, password) =>
  new Promise((resolve, reject) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error))
  );

// post
export const postDataToDatabase = (path, data) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .push(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

// set
export const setDataToDatabase = (path, data) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .set(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

// get
export const getDataFromDatabase = (path) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) =>
        snapshot.val()
          ? resolve(snapshot.val())
          : reject("data not found or database error")
      )
  );

// delete
export const deleteDataDatabase = (path) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .remove()
      .then(() => resolve(true))
      .catch((e) => reject(e))
  );
