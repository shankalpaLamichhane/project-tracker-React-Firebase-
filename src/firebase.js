import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";
import firebase_config from "./config/firebase_config";
  // Your web app's Firebase configuration
  // Your web app's Firebase configuration
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: firebase_config.REACT_APP_FIREBASE_KEY,
  authDomain: firebase_config.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: firebase_config.REACT_APP_FIREBASE_DATABASE,
  projectId: firebase_config.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: firebase_config.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebase_config.REACT_APP_FIREBASE_SENDER_ID,
  appId: firebase_config.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const functions = firebase.functions();


const databaseRef = firebase.database().ref();
export const projectsRef = databaseRef.child("projects")
export const usersRef = databaseRef.child("users")
export const tasksRef = databaseRef.child("tasks")
export const createUser = functions.httpsCallable('createUser');
export const updateUser = functions.httpsCallable('updateUser');
export const deleteUser = functions.httpsCallable('deleteUser');
export const listUser = functions.httpsCallable('listUser');
export const getUser = functions.httpsCallable('getUser');

export default firebase;