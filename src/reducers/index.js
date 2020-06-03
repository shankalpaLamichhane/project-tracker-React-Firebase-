import {combineReducers} from 'redux';
import project from './projectReducer';
import task from './taskReducer';
import alert from './alertReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import user from './userReducer';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  project,
  task,
  alert,
  auth: authReducer,
  errors: errorReducer,
  firebase: firebaseReducer,
  user
})