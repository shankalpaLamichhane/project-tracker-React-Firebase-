import {SET_CURRENT_USER} from '../actions/types'
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import isEmpty from '../validation/is_empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            }

        case 'LOGIN_SUCCESS':
            console.log('Login Success')
            return {
                ...state,
                loading: false
            }

        case 'LOGOUT_SUCCESS':
            console.log('Log out success');
            return state;
        
        case 'REGISTER_SUCCESS':
            console.log('Register Success');
            return state;
        
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        
        default:
            return state;
    }
}


export default authReducer;

