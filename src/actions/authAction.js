import axios from 'axios';
import {GET_ERRORS,SET_CURRENT_USER} from './types';
import { usersRef, createUser } from '../firebase';


export const registerUser = (userData) => {
    return (dispatch, getState, {getFirebase}) => {
        // const firebase = getFirebase();
        // firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        // .then((res) => {
        //     return usersRef.child(res.user.uid)
        //     .set({
        //         firstName: userData.firstName,
        //         lastName: userData.lastName,
        //         userType: 1
        //     })             
        // })
        createUser(userData)
        .then(() => {
            dispatch({type: 'REGISTER_SUCCESS'});
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err//err.response.data
            });
        });

    }       
    
};


export const loginUser = (userData) => (dispatch, getState, {getFirebase}) => {
    dispatch(setLoading());
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .then( (user) => {
            console.log(user);
            dispatch({type:'LOGIN_SUCCESS'});
        } )
        .catch(err => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(`code:${errorCode}  message:${errorMessage}`);
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        }
            
        );

};


// set logged in user

export const setCurrentUser = (userData) => {
    return {
        type: SET_CURRENT_USER,
        payload: userData,
        loading: false
    }
}

// Log user out
export const logoutUser = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(()=>{
        dispatch({type: 'LOGOUT_SUCCESS'});
    });
}


export const setLoading = () => {
    return {type: 'LOADING' };
}