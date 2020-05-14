import {GET_ERRORS} from '../actions/types'
const initialState = {
    loading: false
}

const errorReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_ERRORS:
            // console.log(action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        
        default:
            return state;
    }
}


export default errorReducer;