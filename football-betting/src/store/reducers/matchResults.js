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
const fetchWeeklyResults = (state, action) =>{
    return produce(state, draft =>{
       
        draft.currentResults = action.payload;

    });
}
const stopIintializeResults = (state, action) => {
    return produce(state, draft => {
        draft.loading = true;
    });
}

const setUpWinners = (state, action) => {
    return produce(state, draft => {
        draft.thirteen = (action.jackpot * action.thirteenPercent) / action.thirteenPieces;
        draft.twelve = (action.jackpot * action.twelvePercent) / action.twelvePieces;
        draft.eleven = (action.jackpot * action.elevenPercent) / action.elevenPieces;
        draft.ten = (action.jackpot * action.tenPercent) / action.tenPieces;
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STOP_RESULT_INITIALIZE:
            return stopIintializeResults(state, action);
        case actionTypes.SETUP_WINNERS:
            return setUpWinners(state, action);
        case actionTypes.FETCH_RESULTS:
            return fetchWeeklyResults(state, action);
        default:
            return state;
    }
}

export default reducer;
