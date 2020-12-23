import * as actionTypes from './actionTypes';


export const updateBetSlip = (betIndex, sides) =>{
    return { 
        type : actionTypes.UPDATE_BETSLIP,
        betIndex : betIndex,
        sides : sides
    }
}

export const removeBetSlip = (slipId) =>{
    return {
        type: actionTypes.REMOVE_BETSLIP,
        slipId : slipId
    };
}
export const  toggleTile =  (betIndex, rowIndex,  sideIndex, sides) =>{
    return dispatch=> {
        //dispatch (reverseTitle(betIndex,rowIndex,  sideIndex));
        // dispatch(updateBetSlip(sides))
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


