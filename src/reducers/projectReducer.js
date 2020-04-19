import {FETCH_PROJECTS,FETCH_PROJECT, CLEAR_PROJECT} from '../actions/types';

const initialState = {
  projects:null,
  project:null,
  error:{},
  loading:true
}

export default (state=initialState,action) => {

  const {type,payload} = action;

  switch(type){
    case FETCH_PROJECTS:
      return {
        ...state,
        projects:payload,
        loading: false,
      };
    case FETCH_PROJECT:
      return{
        ...state,
        project: payload,
        loading: false,
      }
    case CLEAR_PROJECT:
      return {
        ...state,
        project:null,
        projects: null,
        loading:false
      };
    default:
      return state;
  }
}