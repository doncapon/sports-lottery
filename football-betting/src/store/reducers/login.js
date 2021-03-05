import * as actionTypes from '../actions/actionTypes';
import produce from "immer";

const initialState = {
    user: {},
    loading: false,
    isLoggedIn: false,
    forgotPassword: false
}

const login = (state, action) => {
    return produce(state, draft => {
        draft.isLoggedIn = true;
        draft.loading = true;
    })
}

const setFunds = (state, action) => {
    return produce(state, draft => {
        draft.user.funds = action.funds;
    })
}
const logout = (state, action) => {
    return produce(state, draft => {
        draft.isLoggedIn = false;
        draft.loading = false;
    })
}

const setIsLoggedIn = (state, action) => {
    return produce(state, draft => {
        draft.isLoggedIn = action.isLoggedIn;

    })
}

const setLoggedInUser = (state, action) => {
    return produce(state, draft => {
        draft.user = action.user;
    })
}

const setForgot = (state, action) => {
    return produce(state, draft => {
        draft.forgotPassword = action.forgotPassword;
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOGGED_IN:
            return setIsLoggedIn(state, action);
        case actionTypes.SET_LOGGEDIN_USER:
            return setLoggedInUser(state, action);
        case actionTypes.LOGIN:
            return login(state, action);
        case actionTypes.LOGOUT:
            return logout(state, action);
        case actionTypes.SET_FORGOT_PASSWORD:
            return setForgot(state, action);
        case actionTypes.SET_FUNDS:
            return setFunds(state, action);
        default:
            return state;
    }
}


export default reducer;



