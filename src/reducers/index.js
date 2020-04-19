import {combineReducers} from 'redux';
import project from './projectReducer';
import alert from './alertReducer'

export default combineReducers({
  project,
  alert
})