import * as actionTypes from './actionTypes';


export const  toggleTile =  (rowIndex, sideIndex) =>{
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


