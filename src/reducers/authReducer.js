import {SET_CURRENT_USER} from '../actions/types'
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import isEmpty from '../validation/is_empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        
        default:
            return state;
    }
}


export default authReducer;

