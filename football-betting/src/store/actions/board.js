import * as actionTypes from './actionTypes';


export const  toggleTile =  (rowIndex, sideIndex, payload) =>{
    return dispatch=> {
        dispatch (reverseTitle(rowIndex, sideIndex));
    };
}
export const reverseTitle = (rowIndex, sideIndex)=>{
    return {
        type: actionTypes.REVERSE_TITLE,
        rowIndex: rowIndex,
        sideIndex : sideIndex
    };
}

export const ableToSend = ()=>{
    return {
        type : actionTypes.ABLE_TO_SEND,
    }
}

export const AddToBetSlip= (payload)=>{
    return {
        type : actionTypes.ADD_TO_BETsSLIP,
        betItems : payload
    };
}


