import * as actionTypes from '../actions/actionTypes'; 
import produce from "immer";

const initialState = {
    username: '',
    password: '',
    user: {},
    loading: false,
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
     
    })
}

const setLoggedInUser = (state, action) =>{
    return produce(state, draft =>{
        draft.user = action.user;
    })
}


const reducer = (state = initialState , action)=>{
    switch (action.type) {
    case actionTypes.SET_PASSWORD:
        return setPassword(state, action);
    case actionTypes.SET_USERNAME:
        return setUsername(state, action);
    case actionTypes.SET_IS_LOGGED_IN:
        return setIsLoggedIn(state, action);
    case actionTypes.SET_LOGGEDIN_USER:
        return setLoggedInUser(state, action);
    default:
        return state;
    }
}


export default reducer;



