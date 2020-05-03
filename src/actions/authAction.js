import axios from 'axios';
// import setAuthToken from '../util/set_auth_token';
import {GET_ERRORS,SET_CURRENT_USER} from './types';
import firebase from 'firebase';
import jwt_decode from 'jwt-decode';

// firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);

export const registerUser = (userData) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .catch(err => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(`code:${errorCode}  message:${errorMessage}`);
            dispatch({
                type: GET_ERRORS,
                payload: err.message//err.response.data
        });
        }
            
        );
    }       
    
};

// Login - Get user token

export const loginUser = (userData) => dispatch => {
    firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .catch(err => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(`code:${errorCode}  message:${errorMessage}`);
            dispatch({
                type: GET_ERRORS,
                payload: err.message//err.response.data
        });
        }
            
        );
    let user = firebase.auth().currentUser;
    console.log(user);
    console.log('user');
    if(user) {
        const { email, uid } = user;
        dispatch(setCurrentUser({id:uid, email: email}));
    }
    else {
        dispatch(setCurrentUser({}));
    }

};


// set logged in user

export const setCurrentUser = (userData) => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}