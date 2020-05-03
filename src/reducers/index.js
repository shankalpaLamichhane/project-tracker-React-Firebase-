import {combineReducers} from 'redux';
import project from './projectReducer';
import alert from './alertReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  project,
  alert,
  auth: authReducer,
  error: errorReducer
})