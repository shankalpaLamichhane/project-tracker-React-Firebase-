import {FETCH_TASKS,FETCH_TASK, CLEAR_TASK} from '../actions/types';

const initialState = {
  tasks:null,
  task:null,
  error:{},
  loading:true
}

export default (state=initialState,action) => {

  const {type,payload} = action;

  switch(type){
    case FETCH_TASKS:
      return {
        ...state,
        tasks:payload,
        loading: false,
      };
    case FETCH_TASK:
      return{
        ...state,
        task: payload,
        loading: false,
      }
    case CLEAR_TASK:
      return {
        ...state,
        task:null,
        tasks: null,
        loading:false
      };
    default:
      return state;
  }
}