import * as actionTypes from './actionTypes';


export const settAdding = (adding, changingSlip)=>{
    return {
        type: actionTypes.SET_ADDING,
        adding: adding,
        changingSlip: changingSlip
        
    }
}

export const addRowToBetSlip = (slipIndex, slip) =>{
    return { 
        type: actionTypes.ADD_ROW_TO_BETSLIP,
        slipIndex : slipIndex,
        slip : slip
    };
}

export const toggleSelectedTile = (slipIndex, gameIndex, sideIndex) =>{
    return { 
        type : actionTypes.TOGGLE_SELECTED_TILE,
        slipIndex : slipIndex,
        gameIndex : gameIndex,
        sideIndex : sideIndex
    }
}

export const removeRowFromBetSlip = (slipId) =>{
    return {
        type: actionTypes.REMOVE_ROW_FROM_BETSLIP,
        slipId : slipId
    };
}
export const  toggleTile =  (betIndex, rowIndex,  sideIndex, sides) =>{
    return dispatch=> {
        dispatch (reverseTitle(betIndex,rowIndex,  sideIndex));
        // dispatch(toggleSelectedTile(sides))
        // dispatch (resetTeams());
    };
}

export const resetTeams = ()=>{
    return  {
        type: actionTypes.RESET_TEAMS
    }
}
export const reverseTitle = (betIndex,sideRow, sideIndex)=>{
    return {
        type: actionTypes.REVERSE_TITLE,
        betIndex : betIndex,
        rowIndex: sideRow,
        sideIndex: sideIndex
    };
}

export const ableToSend = ()=>{
    return {
        type : actionTypes.ABLE_TO_SEND,
    }
}


