const initialState = {
    
    isFACup: false,
    isFACupNextWeek: false,
    daysOffset: -7,
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



