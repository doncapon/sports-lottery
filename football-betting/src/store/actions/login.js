import * as actionTypes from './actionTypes';
import axios from '../../axios-users';


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
export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

export const loginSucces = (user) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user: user
    }
}


export const login = (username, password) => {

    return dispatch => {
        const loginData = {
            username: username,
            password: password,
        };
        dispatch(loginStart());
        axios.post("login", loginData, { withCredentials: true })
            .then(response => {
            
                dispatch(loginSucces(response.data));
                dispatch(setIsLoggedIn(true));

            })
            .catch(error => {
                dispatch(loginFail(error))
                dispatch(setIsLoggedIn(false));
            });
    }
}