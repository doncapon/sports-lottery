const initialState = {
    
    isFACup: true,
    isFACupNextWeek: true,
    daysOffset: -7,
    daysOffsetNextWeek: 7,
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

}



const reducer = (state = initialState , action)=>{
    switch (action) {
        default:
            return state;
    }
}


export default reducer;



