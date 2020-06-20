import {FETCH_TASKS,FETCH_TASK,CLEAR_TASK} from './types';
import firebase from 'firebase';
import {setAlert} from './alert';

const databaseRef = firebase.database().ref();
export const tasksRef = databaseRef.child("tasks")

export const addTask = (newTask={}) => async dispatch => {

    tasksRef
    .child(newTask.id)
    .set(newTask)
    .then(() => {
        console.log('TASK ADDED')
        dispatch(setAlert('Task Created','success'))
    })
    .catch(error=>{
        console.error(error);
    })
}

export const fetchTasks = () => async dispatch => {
    tasksRef.on("value",snap=>{
        dispatch({
            type: FETCH_TASKS,
            payload: snap.val()
        })
        console.log('THE TASKS IN TASK ACTION '+JSON.stringify(snap.val()))
    })
}

export const fetchTasksByProjectId = (projectId) => async dispatch => {
    const filteredTasks = [];
    tasksRef.on("value",snap=>{
        dispatch({
            type: FETCH_TASKS,
            payload: snap.val()
            
        })

        Object.values(snap.val()).filter($=>projectId == $.project)
        
        console.log('THE TASKS IN TASK ACTION '+JSON.stringify(snap.val()))
    })
}

export const fetchTaskById = (id) => async dispatch => {
    var taskRef = firebase.database().ref('tasks/'+id)
    taskRef.on('value',snap=>{
        dispatch({
            type: FETCH_TASK,
            payload: snap.val()
        })
    })
}

export const editTask = (formData= {}) => dispatch => {
    tasksRef.child(formData.id)
    .update(formData)
    .then(() => {
        dispatch(setAlert('Task Updated','success'))
    })
    .catch(err=>{
        console.error(err);
    })
}

export const clearTask = () => async dispatch => {
    return {
        type: CLEAR_TASK,
    }
}

export const deleteTask = (id) => async dispatch => {
    tasksRef
    .child(id)
    .remove()
    .then(() => {
        console.log('TASK DELETED')
        dispatch(setAlert('Task Deleted','danger'))
    })
    .catch(err=>{
        console.error(err);
    })
}

