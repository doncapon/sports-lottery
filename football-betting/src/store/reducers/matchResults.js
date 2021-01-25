import produce from 'immer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentResults: [],
    
    thirteen: 0,
    twelve: 0,
    eleven: 0,
    ten: 0,

    loading: false
}

const intializeResults=(state , action) =>{
    return produce(state, draft => {
        draft.currentResults.splice(draft.currentResults.length, 
            (draft.currentResults.length+1), action.payload);
        draft.loading = true;
    });
}

const setUpWinners=(state, action) =>{
    return produce(state, draft=>{
        draft.thirteen = (action.jackpot * action.thirteenPercent)/action.thirteenPieces;
        draft.twelve = (action.jackpot * action.twelvePercent)/action.twelvePieces;
        draft.eleven = (action.jackpot * action.elevenPercent)/action.elevenPieces;
        draft.ten = (action.jackpot * action.tenPercent)/action.tenPieces;
    });
}


const reducer = (state = initialState , action)=>{
    switch (action.type) {
        case actionTypes.INITIALIZE_CURRENT_RESULT:
            return intializeResults(state, action);
        case actionTypes.SETUP_WINNERS:
            return setUpWinners(state, action);
            default:
            return state;
    }
}


export default reducer;



