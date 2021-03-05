import produce from 'immer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    
    isFACup: false,
    isFACupNextWeek: true,
    daysOffset: 0,
    daysOffsetNextWeek: 0,
    hourToNextDay: 9,   //24 - kick-off time
    kickOffTime: '15:00:00+00:00',

    jackpot: 5000000,
    thirteenPieces: 3,
    twelvePieces: 27,
    elevenPieces: 2345,
    tenPieces: 132745,

    thirteenPercent: 0.5,
    twelvePercent: 0.25,
    elevenPercent: .15,
    tenPercent: 0.1,

    basePrice: 20,
    insertResult: true,

    numberofResultsDisplayed: 39,
    currentResults: [],
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


const reducer = (state = initialState , action)=>{
    switch (action.type) {
        case actionTypes.FETCH_RESULTS:
            return fetchWeeklyResults(state, action);
        case actionTypes.STOP_RESULT_INITIALIZE:
            return stopIintializeResults(state, action);
        default:
            return state;
    }
}


export default reducer;



