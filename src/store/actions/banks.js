import * as actionTypes from './actionTypes';
import firebase from '../../config/firebase/firebase';
export const initializeAllowedBanks = (payload) => {
    return {
        type: actionTypes.INITIALIZE_ALLOWED_BANKS,
        payload: payload
    }
}


export const resetSavedBanks = (payload) => {
    return {
        type: actionTypes.RESET_SAVED_BANKS,
        payload: payload
    }
}
export const initializeSavedBanks = (payload) => {
    return {
        type: actionTypes.INITIALIZE_SAVED_BANKS,
        payload: payload

    }
}
export const fetchBanks = () => {
    return dispatch => {
        let data;
        let newData = [];

        firebase.auth().onAuthStateChanged( (user)=> {
            if (user && user.emailVerified) {
                var accountRef = firebase.database().ref('bank-accounts/' + user.uid);
                accountRef.on('value', (snapshot) => {
                    data = snapshot.val();
                    if (data === null) {
                        const accountDetail = { accountName: '', bank: '', accountNumber: '--Use an exisitng bank--' }
                        firebase.database().ref('bank-accounts/'
                            + user.uid + "/" + accountDetail.accountNumber).set(
                                accountDetail
                            ).then(() => {
                                var accountRef1 = firebase.database().ref('bank-accounts/' + user.uid);
                                accountRef1.on('value', (snapshot) => {

                                    data = snapshot.val();
                                    Object.keys(data).map(key => newData.splice(newData.length, newData.length + 1, data[key]))
                                })
                            });

                    } else {
                        Object.keys(data).map(key =>
                            newData.splice(newData.length, newData.length + 1, data[key])
                        )
                    }
                    dispatch(initializeSavedBanks(newData))
                });
            }
        });

        let bankRef = firebase.database().ref().child("banks");
        bankRef.on("value", (snapshot) => {
            const resultData = snapshot.val();
            let banks = [];
            Object.keys(resultData).map((key, i) => 
                banks.splice(banks.length, banks.length + 1, resultData[key])
            );
            dispatch(initializeAllowedBanks(banks))
        });
        firebase.database().ref('bank-accounts').off();
        bankRef.off();

    }
}


export const reseySavedBanks = () => {
    return {
        type: actionTypes.RESET_SAVED_BANKS,

    }
}

export const setLoggedInUser = (user) => {
    return {
        type: actionTypes.SET_LOGGEDIN_USER,
        user: user
    }
}