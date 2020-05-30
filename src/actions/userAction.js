import { FETCH_USERS, FETCH_USER, CLEAR_PROJECT, GET_ERRORS } from './types'
import firebase from 'firebase';
import { setAlert } from './alert';
import { getUser, createUser, listUser, deleteUser as removeUser, updateUser } from '../firebase';

const databaseRef = firebase.database().ref();
export const projectsRef = databaseRef.child("projects")


export const addUser = (userData = {}) => async dispatch => {

    createUser(userData)
    .then(() => {
        dispatch(setAlert('User Created', 'success'));
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    });
}

export const fetchUsers = () => async dispatch => {
    listUser()
    .then((res)=>{
        dispatch({
            type: FETCH_USERS,
            payload: res.data.users
          });
    })
    .catch(err => {
        console.error(err);
      })
  
}

export const fetchUserById = (id) => async dispatch => {

  console.log('THE ID TO FETCH USER IS ::: ' + id);
  getUser({uid:id})
  .then((res)=>{
      console.log(res);
    dispatch({
        type: FETCH_USER,
        payload: res.data.userRecord
      });
  })
  

}

export const editUser = (formData = {}) => dispatch => {

  updateUser(formData)
  .then(()=>{
    console.log('USER UPDATED')
      dispatch(setAlert('User Updated', 'success'))
  })
  .catch(err => {
      console.error(err);
  })
}

export const clearUser = () => async dispatch => {
  return {
    type : CLEAR_PROJECT,
  }
}

export const deleteUser = (id) => async dispatch => {
    removeUser({uid:id})
    .then(()=>{
        console.log('USER DELETED')
        dispatch(setAlert('User Deleted', 'danger'))
    })
    .catch(err => {
        console.error(err);
    });
}