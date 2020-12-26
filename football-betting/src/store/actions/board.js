import * as actionTypes from './actionTypes';

export const toggleSelectedTile = (slipIndex, gameIndex,sideIndex, side) =>{
    return { 
        type : actionTypes.TOGGLE_SELECTED_TILE,
        slipIndex : slipIndex,
        gameIndex : gameIndex,
        sideIndex : sideIndex,
        side: side
    }
}


export const setAdding = (adding)=>{
    return {
        type: actionTypes.SET_ADDING,
        adding: adding,
    }
}

export const addRowToBetSlip = (position) =>{
    return { 
        type: actionTypes.ADD_ROW_TO_BETSLIP,
        position: position
    };
}


export const removeRowFromBetSlip = (slipId) =>{
    return {
        type: actionTypes.REMOVE_ROW_FROM_BETSLIP,
        slipId : slipId
    };
}

export const resetTeams = ()=>{
    return  {
        type: actionTypes.RESET_TEAMS
    }
}


export const ableToSend = ()=>{
    return {
        type : actionTypes.ABLE_TO_SEND,
    }
}


