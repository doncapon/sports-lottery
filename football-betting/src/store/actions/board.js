import * as actionTypes from './actionTypes';

export const isPurchasable = (index)=>{
    return {
        type: actionTypes.IS_PURCHASABLE,
        slipIndex: index
    }
}

export const toggleSelectedTile = (slipIndex, gameIndex,sideIndex, side) =>{
    return { 
        type : actionTypes.TOGGLE_SELECTED_TILE,
        slipIndex : slipIndex,
        gameIndex : gameIndex,
        sideIndex : sideIndex,
        side: side
    };
}

export const setPlayingIndex = (position) =>{
    return{
        type: actionTypes.SET_PLAYING_INDEX,
        position: position
    }
}

export const addRowToBetSlip = (position) =>{
    return { 
        type: actionTypes.ADD_ROW_TO_BETSLIP,
        position: position
    };
}


export const removeRowFromBetSlip = (deleteId) =>{
    return {
        type: actionTypes.REMOVE_ROW_FROM_BETSLIP,
        deleteId : deleteId
    };
}

export const disableAddButtons = (index) =>{
    return {
        type: actionTypes.DISABLE_ADD_BUTTONS,
    }
}