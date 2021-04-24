import * as actionTypes from '../actions/actionTypes'; 
import produce from "immer";

const initialState = {
    allowedBanks: [],
    savedBanks: [],
}

const initializeAllowedBanks = (state, action) =>{
    return produce(state, draft=>{
        draft.allowedBanks = Object.assign([] , action.payload);
    })
}

const initializeSavedBanks = (state, action) =>{
    return produce(state, draft =>{
        draft.savedBanks = Object.assign([] , action.payload);
    })
}
const resetSavedBanks = (state, action) =>{
    return produce(state, draft =>{
        draft.savedBanks= Object.assign([], action.payload);
    })
}

const reducer = (state = initialState , action)=>{
    switch (action.type) {
    case actionTypes.INITIALIZE_ALLOWED_BANKS:
        return initializeAllowedBanks(state, action);
    case actionTypes.INITIALIZE_SAVED_BANKS:
        return initializeSavedBanks(state, action);
    case actionTypes.RESET_SAVED_BANKS:
        return resetSavedBanks(state, action);
    default:
        return state;
    }
}


export default reducer;



