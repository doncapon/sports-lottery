import * as actionTypes from "../actions/actionTypes";

import { updateObject  } from "../../shared/utility";

const initialStte = {

    teams : [
        // {
        //     team1 : 'Manchester United',
        //     team2: 'Watford FC' ,
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // }, 
        
        // {
        //     team1 : 'Chelsea',
        //     team2: 'Arsenal',
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // },
        // {
        //     team1 : 'Real Madrid', 
        //     team2: 'Barcelona',
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // },

        // {
        //     team1 : 'Leicester city', 
        //     team2: 'Manchester city', 
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // },
        // {
        //     team1 : 'Wolverhampton wonderers', 
        //     team2: 'Stoke city', 
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // },
        // {
        //     team1 : 'Liverpool', 
        //     team2: 'Newcastle United',
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // },
        // {
        //     team1 : 'Watford', 
        //     team2: 'Burnley FC',     
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // },
        // {
        //     team1 : 'Everton', 
        //     team2: 'Tottenham HotSpur',   
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]

        // },
        // {
        //     team1 : 'Birmingham City', 
        //     team2: 'Fulham', 
        //     rowValid: false,
        //     rowAmount: 0,
        //     sides : [   {selected :  false}, {selected :  false },{selected :   false}]
        // },
        {
            team1 : 'Crystal Palace', 
            team2: 'HuddersField',     
            rowValid: false,
            rowAmount: 0,
            sides : [  {selected :   false}, {selected :  false },{selected :   false}]
        },
        {
            team1 : 'West Bromich Abion', 
            team2: 'WestHam United',     
            rowValid: false,
            rowAmount: 0,
            sides : [ {selected : false}, {selected : false }, {selected : false}]
        },
        {
            team1 : 'Southhampton', 
            team2: 'BrentFord',     
            rowValid: false,
            rowAmount: 0,
            sides : [ {selected :   false},{selected : false },{selected :  false}]
        },
    ],
    totalPrice : 0,
    allRowsValid: false,
    betSlip : [],
    isAlreadySent: false
};





const reverseTitle = (state , action) =>{
    const updatedTeams = [...state.teams];
    const updatedTeamRow = updatedTeams[action.rowIndex];
    const updatedSide = [...updatedTeamRow.sides]
    let updatedAllreadySend = state.isAlreadySent;
    updatedSide[action.sideIndex].selected = !updatedSide[action.sideIndex].selected;
        // increasing the amount per click
            if(updatedSide[action.sideIndex].selected){
                updatedTeamRow.rowAmount += 1;
            }else{
                updatedTeamRow.rowAmount -= 1;
            }
    updatedTeamRow.rowValid  =  
    (updatedSide[0] ||
    updatedSide[1] ||
    updatedSide[2]) ;

    //Checking alll rows are valid
    let updatedAllRow = state.allRowsValid;
    let isvalid = true;
    for(let team of updatedTeams){
        if(!team.rowValid){
            isvalid = false;
        }
    }
    updatedAllRow = isvalid;

    updatedTeams[action.rowIndex] = updatedTeamRow;

    //Calculating total price
    let updatedTotalPrice = state.totalPrice;
    let totalAmout = 0;
    if( isvalid){
        totalAmout =  25;
    }

    for(let team of updatedTeams){
            totalAmout = totalAmout * team.rowAmount;
    } 
    updatedTotalPrice = totalAmout;

    //Handling betSlip
    const  updatedSlip = [...state.betSlip];
    if(isvalid){
        if(!updatedAllreadySend){
            updatedSlip.push(Object.assign({}, {teams :  updatedTeams}, {allRowsValid : updatedAllRow}, {grandTotalPrice: updatedTotalPrice }));
            updatedAllreadySend = true;
        }
        for(let betrows of updatedSlip){
            betrows.grandTotalPrice  += updatedTotalPrice;
        }

    }
     return updateObject(state , {
        teams : updatedTeams,
        [action.rowIndex] : updatedTeamRow,
        ...updatedTeams[action.rowIndex],
        allRowsValid : updatedAllRow,
        totalPrice : updatedTotalPrice,
        betSlip : updatedSlip,
        isAlreadySent : updatedAllreadySend

    });
}


const ableToSend = (state, action) =>{
    return updateObject (state , {
        isAlreadySent : false
    })
}

const reducer = (state = initialStte, action) =>{
    switch (action.type){
        case actionTypes.REVERSE_TITLE:
            return reverseTitle(state, action);
        case actionTypes.ABLE_TO_SEND:
            return ableToSend(state, action);
       default: 
       return state;
    }
}



export default reducer;