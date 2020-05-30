import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";
  // Your web app's Firebase configuration
  // Your web app's Firebase configuration
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAQ_XYpCEq27G5Kl6W_eoeGCJ18LTQ3g6w",
  authDomain: "react-firebase-auth-bfff6.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-bfff6.firebaseio.com",
  projectId: "react-firebase-auth-bfff6",
  storageBucket: "react-firebase-auth-bfff6.appspot.com",
  messagingSenderId: "1053620932333",
  appId: "1:1053620932333:web:b8eefc2868c4e12f7c06e4"
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