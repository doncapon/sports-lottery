import * as actionTypes from './actionTypes';


export const  toggleTile =  (key, index) =>{
    return dispatch=> {
        dispatch (reverseTitle(key, index));
    };
}
export const reverseTitle = (key, index)=>{
    return {
        type: actionTypes.REVERSE_TITLE,
        side: key,
        index : index
    }
}


