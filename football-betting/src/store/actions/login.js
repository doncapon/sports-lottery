import * as actionTypes from './actionTypes';
import axios from '../../axios-users';

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

export const loginSucces = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
    }
}


export const login = (username, password) => {

    return dispatch => {
        const loginData = {
            username: username,
            password: password,
        };
        dispatch(loginStart());
        axios.post("login", loginData)
            .then(response => {
                if (response.data === "login successfully") {
                    // axios.get("me")
                    //     .then(response2 => {
                    //         console.log(response2);
                            dispatch(setIsLoggedIn(true));
                        // })
                        // .catch(error1 => {
                        //     dispatch(loginFail(error1.response.data))
                        // })

                }

            })
            .catch(error => {
                dispatch(loginFail(error.response.data))
                dispatch(setIsLoggedIn(false));
            });
    }
}