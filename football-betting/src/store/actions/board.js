import * as actionTypes from './actionTypes';


export const setEditIndex= (index)=>{
    return {
        type: actionTypes.SET_EDITING_INDEX,
        position: index
    }
}

export const setAdding=(slipIndex,isAdded)=>{
    return {
        type: actionTypes.SET_ADDING,
        slipIndex: slipIndex,
        isAdded: isAdded
    }
}

export const checkPurchasable = (index)=>{
    return {
        type: actionTypes.CHECK_PURCHASABLE,
        slipIndex: index
    }
}

export const toggleSelectedTile = (slipIndex, gameIndex,sideIndex, side) =>{
    return { 
        type : actionTypes.TOGGLE_SELECTED_TILE,
        slipIndex: slipIndex,
        gameIndex : gameIndex,
        sideIndex : sideIndex,
        side: side
    };
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