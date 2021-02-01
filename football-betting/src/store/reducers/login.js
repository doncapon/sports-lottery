import * as actionTypes from '../actions/actionTypes'; 
import produce from "immer";

const initialState = {
    user: {},
    loading: false,
    isLoggedIn: false,
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
    case actionTypes.SET_IS_LOGGED_IN:
        return setIsLoggedIn(state, action);
    case actionTypes.SET_LOGGEDIN_USER:
        return setLoggedInUser(state, action);
    default:
        return state;
    }
}


export default reducer;



