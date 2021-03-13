import produce from 'immer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isFACup: false,
    isFACupNextWeek: true,
    daysOffset: 0,
    daysOffsetNextWeek: 0,
    hourToNextDay: 9,   //24 - kick-off time
    kickOffTime: '15:00:00+00:00',
    eventDate: null,

    thirteenPercent: 0.5,
    twelvePercent: 0.25,
    elevenPercent: .15,
    tenPercent: 0.1,

    basePrice: 20,
    insertResult: true,

    numberofResultsDisplayed: 26,
    currentResults: [],
    loading: false

}

const fetchWeeklyResults = (state, action) => {
    return produce(state, draft => {

        draft.currentResults = action.payload;

    });
}
const stopIintializeResults = (state, action) => {
    return produce(state, draft => {
        draft.loading = true;
    });
}

const setEventDate = (state, action) => {
    return produce(state, draft => {
        draft.eventDate = action.eventDate
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RESULTS:
            return fetchWeeklyResults(state, action); 
        case actionTypes.STOP_RESULT_INITIALIZE:
            return stopIintializeResults(state, action);
        case actionTypes.SET_EVENTDATE:
            return setEventDate(state, action);
        default:
            return state;
    }
}


export default reducer;



