import {combineReducers} from 'redux';
import project from './projectReducer';
import alert from './alertReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  project,
  alert,
  auth: authReducer,
  errors: errorReducer,
  firebase: firebaseReducer
})