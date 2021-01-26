import * as actionTypes from '../actions/actionTypes'; 
import produce from "immer";

const initialState = {
    username: '',
    password: '',
    loginTime: null,
    user: {},
    loading: false,
    error: null,
    isLoggedIn: false,
}
const setUsername = (state, action) =>{
    return produce(state, draft=>{
        draft.username = action.username
    })
}

const setPassword = (state, action) =>{
    return produce(state, draft=>{
        draft.password = action.password
    })
}
const setIsLoggedIn = (state, action) =>{
    return produce(state, draft=>{
        draft.isLoggedIn = action.isLoggedIn;
        if(!action.isLoggedIn){
            draft.username = '';
            draft.password = '';
        
        }
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
        draft.user = Object.assign({}, action.user);
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
    case actionTypes.SET_PASSWORD:
        return setPassword(state, action);
    case actionTypes.SET_USERNAME:
        return setUsername(state, action);
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



