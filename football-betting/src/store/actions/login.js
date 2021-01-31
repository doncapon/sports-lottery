import * as actionTypes from './actionTypes';

export const setUsername = (username) =>{
    return{
        type: actionTypes.SET_USERNAME,
        username: username
    }
}


export const setPassword = (password) =>{
    return{
        type: actionTypes.SET_PASSWORD,
        password: password
    }
}

export const setIsLoggedIn = (isLoggedIn) => {
    return {
        type: actionTypes.SET_IS_LOGGED_IN,
        isLoggedIn: isLoggedIn
    }
}

export const setLoggedInUser = (user) => {
    return {
        type: actionTypes.SET_LOGGEDIN_USER,
        user: user
    }
}