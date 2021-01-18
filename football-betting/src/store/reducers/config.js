// import actionTypes  from '../actions/actionTypes';

const initialState = {
    
    isFACup: true,
    isFACupNextWeek: false,
    daysOffset: 0,
    daysOffsetNextWeek: 7,
    hourToNextDay: 9,   //24 - kick-off time
    kickOffTime: '15:00:00+00:00',
}



const reducer = (state = initialState , action)=>{
    switch (action) {
        default:
            return state;
    }
}


export default reducer;



