


import * as actionTypes from './actionTypes';

export const AddToBetSlipa= (payload)=>{
    return {
        type : actionTypes.ADD_TO_BETsSLIP,
        BetItemss : payload
    };
}