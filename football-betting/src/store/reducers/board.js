import * as actionTypes from "../actions/actionTypes";

import { updateObject  } from "../../shared/utility";

const initialStte = {

    teams : [
        // {
        //     team1 : 'Manchester United',
        //     team2: 'Watford FC' ,
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false
        //     },
        //     rowValid: false,
        //     rowAmount: 0
        // }, 
        
        // {
        //     team1 : 'Chelsea',
        //     team2: 'Arsenal',
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false,
        //      },
        //      rowValid: false,
        //      rowAmount: 0
        // },
        // {
        //     team1 : 'Real Madrid', 
        //     team2: 'Barcelona',
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false,
        //     },
        //     rowValid: false,
        //     rowAmount: 0
        // },

        // {
        //     team1 : 'Leicester city', 
        //     team2: 'Manchester city', 
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false,
        //     },
        //     rowValid: false,
        //     rowAmount: 0
        // },
        // {
        //     team1 : 'Wolverhampton wonderers', 
        //     team2: 'Stoke city',     
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false,
        //     },
        //     rowValid: false,
        //     rowAmount: 0
        // },
        // {
        //     team1 : 'Liverpool', 
        //     team2: 'Newcastle United',
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false,
        //     },
        //     rowValid: false,
        //     rowAmount: 0
        // },
        // {
        //     team1 : 'Watford', 
        //     team2: 'Burnley FC',     
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false,
        //     },
        //     rowValid: false,
        //     rowAmount: 0
        // },
        // {
        //     team1 : 'Everton', 
        //     team2: 'Tottenham HotSpur',   
        //     sides : {
        //         home: false,
        //         draw : false,
        //         away: false,
        //     },
        //     rowValid: false,
        //     rowAmount: 0
        // },
        {
            team1 : 'Birmingham City', 
            team2: 'Fulham', 
                sides : {
                    home: false,
                    draw : false,
                    away: false,
            },
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Crystal Palace', 
            team2: 'HuddersField',     
            sides : {
                home: false,
                draw : false,
                away: false,
            },
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'West Bromich Abion', 
            team2: 'WestHam United',     
            sides : {
                home: false,
                draw : false,
                away: false,
            },
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Southhampton', 
            team2: 'BrentFord',     
            sides : {
                home: false,
                draw : false,
                away: false,
            },
            rowValid: false,
            rowAmount: 0
        },
    ],
    totalPrice : 0,
    allRowsValid: false
};

const reverseTitle = (state , action) =>{
    const updatedTeams = state.teams;

    updatedTeams[action.index].sides[action.side] = !updatedTeams[action.index].sides[action.side];
        // increasing the amount per click
    if(updatedTeams[action.index].sides.[action.side]){
        updatedTeams[action.index].rowAmount += 1;
    }else{
        updatedTeams[action.index].rowAmount -= 1;

    }

    updatedTeams[action.index].rowValid  =  updatedTeams[action.index].sides['home'] ||
    updatedTeams[action.index].sides['draw'] ||
    updatedTeams[action.index].sides['away'] ;


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
    const allValid = updatedAllRow;
    let totalAmout = 0;
    if(allValid )
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