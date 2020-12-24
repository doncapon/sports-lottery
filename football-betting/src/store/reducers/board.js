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
    slips : [
             [
    
                [ {selected : false}, {selected : false}, {selected : false} ],
                [ {selected : false}, {selected : false}, {selected : false} ],
                [ {selected : false}, {selected : false}, {selected : false} ]
             ]
    ],
    games:
        [
            [ {selected : false}, {selected : false}, {selected : false} ],
            [ {selected : false}, {selected : false}, {selected : false} ],
            [ {selected : false}, {selected : false}, {selected : false} ]
        ],

    sides : [
        {selected : false}, {selected : false}, {selected : false}
    ],
    changingSlip: {
         index: 0,
         value: null   
    },
    isAlreadySent: false,
    adding: false
};

const toggleSelectedTile = (state, action) =>{
     
    let updatedSlips = [...state.slips];
    let updatedSlip = [...updatedSlips[action.slipIndex]];
    let updatedGames =[...updatedSlip[action.gameIndex]];
    let updatedSide = updatedGames[action.sideIndex];

    updatedSide.selected = !updatedSide.selected

    return updateObject (state, {slip : updatedSlip, games :updatedGames,
                        sides : updatedSide}
                        );
}

const addRowToBetSlip = (state, action) =>{
    
    const updatedSlip = [...state.slips];
    const index = action.slipIndex;
    Object.assign([] , updatedSlip, {index: action.slip})
    
    return updateObject(state, { betSlip : updatedSlip })
}
const settAdding= (state, action) =>{
    let updatedSlips = [...state.slips];
    const updatedChangingSlip = action.changingSlip;
    updatedSlips.splice(updatedChangingSlip.index,0, updatedChangingSlip.value)

    return updateObject(state, { 
        slips: updatedSlips,
         adding: action.adding,
         changingSlip: updatedChangingSlip});
}

const reverseTitle = (state , action) =>{
    // const updatedSlips = [...[state.betSlip][action.betIndex]];
    // const updatedSlipsRow= [...[updatedSlips[action.rowIndex]]];
    // let selectSide = updatedSlipsRow[action.sideIndex];
    
    // selectSide = !selectSide; 

    // return updateObject(state,{ ...state.betSlip, updatedSlips, updatedSlipsRow, ...selectSide
    //         });
}


const removeRowFromBetSlip = (state, action) =>{
    // const updateSlip = [...state.betSlip];
    // updateSlip.filter((slip)=>{
    //     return  slip.index !== action.slipId
    // } );
    // return updateObject (state, ...updateSlip);
}



const ableToSend = (state, action) =>{
    // return updateObject (state , {
    //     isAlreadySent : false
    // });
}

const reducer = (state = initialStte, action) =>{
    switch (action.type){
        case actionTypes.REVERSE_TITLE:
            return reverseTitle(state, action);
        case actionTypes.ABLE_TO_SEND:
            return ableToSend(state, action);
        case actionTypes.TOGGLE_SELECTED_TILE:
            return toggleSelectedTile(state, action);
        case actionTypes.REMOVE_ROW_FROM_BETSLIP:
            return removeRowFromBetSlip(state, action);
        case actionTypes.ADD_ROW_TO_BETSLIP:
            return addRowToBetSlip(state, action);
        case actionTypes.SET_ADDING:
            return settAdding(state, action);
       default: 
       return state;
    }
}


export default reducer;