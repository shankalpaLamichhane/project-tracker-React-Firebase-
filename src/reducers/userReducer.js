import {FETCH_USERS,FETCH_USER, CLEAR_USER} from '../actions/types';

const initialState = {
  users:null,
  user:null,
  error:{},
  loading:true
}

export default (state=initialState,action) => {

  const {type,payload} = action;

  switch(type){
    case FETCH_USERS:
      return {
        ...state,
        users:payload,
        loading: false,
      };
    case FETCH_USER:
      return{
        ...state,
        user: payload,
        loading: false,
      }
    case CLEAR_USER:
      return {
        ...state,
        user:null,
        users: null,
        loading:false
      };
    default:
      return state;
  }
}