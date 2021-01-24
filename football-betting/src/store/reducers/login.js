import * as actionTypes from '../actions/actionTypes'; 
import produce from "immer";

const initialState = {
    loading: false,
    error: null,
    isLoggedIn: false
}

const setIsLoggedIn = (state, action) =>{
    return produce(state, draft=>{
        draft.isLoggedIn = action.isLoggedIn;
        console.log(draft.isLoggedIn);
    })
}

const loginStart = (state, action) =>{
    return produce(state, draft =>{
        draft.loading = true;
        draft.error = null;
    })
}

const loginSuccess = (state, action )=>{
    return produce(state, draft =>{
        draft.loading = false;
        draft.error = null;
    })
}


const loginFail = (state, action )=>{
    return produce(state, draft =>{
        draft.loading = false;
        draft.error = action.error;
    })
}


const reducer = (state = initialState , action)=>{
    switch (action.type) {
    case actionTypes.LOGIN_START:
        return loginStart(state, action);
    case actionTypes.SET_IS_LOGGED_IN:
        return setIsLoggedIn(state, action);
    case actionTypes.LOGIN_SUCCESS:
        return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
        return loginFail(state, action);
    default:
        return state;
    }
}


export default reducer;



