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
        },
        {
            team1 : 'West Bromich Abion', 
            team2: 'WestHam United',     
            rowValid: false,
            rowAmount: 0
        },
        {
            team1 : 'Southhampton', 
            team2: 'BrentFord',     
            rowValid: false,
            rowAmount: 0
        }
    ]
    ,
    betSlip : [
             [
    
                [ {selected : false}, {selected : false}, {selected : false} ],
                [ {selected : false}, {selected : false}, {selected : false} ],
                [ {selected : false}, {selected : false}, {selected : false} ]
             ]
    ],

    isAlreadySent: false,
};

const reverseTitle = (state , action) =>{
    const updatedBetSlip = [state.betSlip][action.betIndex];
    const updatedBetSlipRow= [updatedBetSlip[action.rowIndex]];
    let selectSide = updatedBetSlipRow[action.sideIndex];
    
     
    selectSide = !selectSide; 
    

    return updateObject(state,{ ...state.betSlip, ...updatedBetSlip,...updatedBetSlipRow, ...selectSide
            });
}

const updateBetSlip = (state, action) =>{
     
    let updatedBetSlip = [...state.betSlip];

    updatedBetSlip =  [action.sides]
    // Object.assign([], array, {2: newItem});
    updatedBetSlip =  Object.assign([], updatedBetSlip, { [action.betIndex] : action.sides});
    console.log(updatedBetSlip[action.betIndex])
    return updateObject (state, {betSlip :  updatedBetSlip});
    
}

const removeBetSlip = (state, action) =>{
    const updateSlip = [...state.betSlip];
    updateSlip.filter((slip)=>{
        return  slip.index !== action.slipId
    } );
    return updateObject (state, ...updateSlip);
}



const ableToSend = (state, action) =>{
    return updateObject (state , {
        isAlreadySent : false
    });
}

const reducer = (state = initialStte, action) =>{
    switch (action.type){
        case actionTypes.REVERSE_TITLE:
            return reverseTitle(state, action);
        case actionTypes.ABLE_TO_SEND:
            return ableToSend(state, action);
        case actionTypes.UPDATE_BETSLIP:
            return updateBetSlip(state, action);
        case actionTypes.REMOVE_BETSLIP:
            return removeBetSlip(state, action);
       default: 
       return state;
    }
}


export default reducer;