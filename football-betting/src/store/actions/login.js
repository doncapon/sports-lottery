import * as actionTypes from './actionTypes';
import firebase from '../../config/firebase/firebase';

export const setIsLoggedIn = (isLoggedIn) => {
    return {
        type: actionTypes.SET_IS_LOGGED_IN,
        isLoggedIn: isLoggedIn
    }
}

export const login2 = () => {
    return {
        type: actionTypes.LOGIN,
    }
}
export const setFunds=(funds) =>{
    return {
        type: actionTypes.SET_FUNDS,
        funds: funds
    }
}
export const setForgot = (forgot) => {
    return {
        type: actionTypes.SET_FORGOT_PASSWORD,
        forgotPassword: forgot
    }

}
export const logout2 = () => {
    return {
        type: actionTypes.LOGOUT,
    }

}
export const logout = () => {
    return dispatch => {
        firebase.auth().signOut().then(() => {
            dispatch(logout2());
            dispatch(setLoggedInUser({}));
            dispatch(setIsLoggedIn(false));
        });
    }

}

    export const login = (email, password) => {
        return dispatch => {
            dispatch(login2());
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    if (user.emailVerified) {
                        let userRef = firebase.database().ref("users/" + user.uid);
                        userRef.on('value', (snapshot) => {
                            const dbUser = snapshot.val();
                            dispatch(setLoggedInUser(user));
                            dispatch(setIsLoggedIn(true));
                            dispatch(setLoggedInUser(dbUser));
                        });
                        return function cleanup() {
                            userRef.off();
                          }
                    }
                    
                })
                .catch((error) => {
                    setLoggedInUser(error);
                    dispatch(setForgot(true));
                    dispatch(setIsLoggedIn(false));
                    dispatch(logout2())
                });

        
        }
    }

    export const setLoggedInUser = (user) => {
        return {
            type: actionTypes.SET_LOGGEDIN_USER,
            user: user
        }
    }