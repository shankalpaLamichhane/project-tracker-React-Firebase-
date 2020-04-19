import { FETCH_PROJECTS, FETCH_PROJECT, CLEAR_PROJECT } from './types'
import firebase from 'firebase';
import { setAlert } from './alert';

const databaseRef = firebase.database().ref();
export const projectsRef = databaseRef.child("projects")


export const addProject = (newProject = {}) => async dispatch => {

  projectsRef
    .child(newProject.id)
    .set(newProject)
    .then(() => {
      console.log('PROJECT ADDED')
      dispatch(setAlert('Project Created', 'success'))
    })
    .catch(err => {
      console.error(err);
    })
}

export const fetchProjects = () => async dispatch => {
  projectsRef.on("value", snap => {
    dispatch({
      type: FETCH_PROJECTS,
      payload: snap.val()
    })
  })
}

export const fetchProjectById = (id) => async dispatch => {

  console.log('THE ID TO FETCH PROJECT IS ::: ' + id)
  var projectRef = firebase.database().ref('projects/' + id)
 projectRef.on('value', snap => {
    dispatch({
      type: FETCH_PROJECT,
      payload: snap.val()
    })
  })
}

export const editProject = (formData = {}) => dispatch => {
  projectsRef.child(formData.id)
    .update(formData)
    .then(() => {
      console.log('PROJECT UPDATED')
      dispatch(setAlert('Project Updated', 'success'))
    })
    .catch(err => {
      console.error(err);
    })
}

export const clearProject = () => async dispatch => {
  return {
    type : CLEAR_PROJECT,
  }
}

export const deleteProject = (id) => async dispatch => {

  projectsRef
    .child(id)
    .remove()
    .then(() => {
      console.log('PROJECT DELETED')
      dispatch(setAlert('Project Deleted', 'danger'))
    })
    .catch(err => {
      console.error(err);
    })
}