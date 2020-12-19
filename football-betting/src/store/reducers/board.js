import * as actionTypes from "../actions/actionTypes";

import { updateObject  } from "../../shared/utility";

const initialStte = {

    teams : [
        {
            team1 : 'Manchester United',
            team2: 'Watford FC' ,
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        }, 
        
        {
             team1 : 'Chelsea',
             team2: 'Arsenal',
             home: false,
             draw : false,
             away: false,
             rowValid: false,
             rowAmount: 0
        },
        {
            team1 : 'Real Madrid', 
            team2: 'Barcelona',
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },

        {
            team1 : 'Leicester city', 
            team2: 'Manchester city', 
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Wolverhampton wonderers', 
            team2: 'Stoke city',     
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Liverpool', 
            team2: 'Newcastle United',
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Watford', 
            team2: 'Burnley FC',     
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Everton', 
            team2: 'Tottenham HotSpur',   
            home: false,
            draw : false,
            away: false,
        rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Birmingham City', 
            team2: 'Fulham', 
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Crystal Palace', 
            team2: 'HuddersField',     
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'West Bromich Abion', 
            team2: 'WestHam United',     
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Southhampton', 
            team2: 'BrentFord',     
            home: false,
            draw : false,
            away: false,
            rowValid: false,
            rowAmount: 0
        },
    ],
    totalPrice : 0,
    allRowsValid: false
};

const reverseTitle = (state , action) =>{
    const updatedTeams = state.teams;
    const updatedSides = !updatedTeams[action.index][action.side];

    updatedTeams[action.index][action.side] = updatedSides;;

        // increasing the amount per click
    if(updatedSides){
        updatedTeams[action.index].rowAmount += 1;
    }else{
        updatedTeams[action.index].rowAmount -= 1;
    }
    

    updatedTeams[action.index].rowValid  =  
    (updatedTeams[action.index]['home'] ||
    updatedTeams[action.index]['draw'] ||
    updatedTeams[action.index]['away']) ;


    //Checking alll rows are valid
    let updatedAllRow = state.allRowsValid;
    let isvalid = true;
    for(let team of updatedTeams){
        if(!team.rowValid){
            isvalid = false;
        }
    }
    updatedAllRow = isvalid;


    //Calculating total price
    let updatedTotalPrice = state.totalPrice;
    let totalAmout = 0;
    if(updatedAllRow )
        totalAmout =  25;

    for(let team of updatedTeams){
        totalAmout = totalAmout * team.rowAmount;
    } 
    updatedTotalPrice = totalAmout;

     return updateObject(state , {
        teams : updatedTeams,
        allRowsValid : updatedAllRow,
        totalPrice : updatedTotalPrice
    });
}

const reducer = (state = initialStte, action) =>{
    switch (action.type){
        case actionTypes.REVERSE_TITLE:
            return reverseTitle(state, action);
       default: 
       return state;
    }
}



export default reducer;