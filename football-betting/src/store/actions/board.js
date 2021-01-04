import * as actionTypes from './actionTypes';


export const calculateOverAllPrice = (slipIndex, gameIndex, sideIndex)=>{
    return dispatch =>{
        dispatch(calculateSlipPrice(slipIndex, gameIndex, sideIndex));
        dispatch(calculateGrandTtoalPriceOfAllSlips(slipIndex));
    }
}


export const addEmptySlip = () =>{
    return { 
        type : actionTypes.ADD_EMPTY_SLIP,
        
    };
}


export const calculateSlipPrice = (slipIndex, gameIndex,sideIndex) =>{
    return { 
        type : actionTypes.CALCULATE_SLIP_PRICE,
        slipIndex: slipIndex,
        gameIndex : gameIndex,
        sideIndex : sideIndex
        
    };
}


export const calculateGrandTtoalPriceOfAllSlips = (slipIndex) =>{
    return { 
        type : actionTypes.CALCULAT_GRAND_tOTAL,
        slipIndex: slipIndex,
        
    };
}


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

export const setRemoving=(slipIndex,isRemoved)=>{
    return {
        type: actionTypes.SET_REMOVING,
        slipIndex: slipIndex - 1,
        removing: isRemoved
    }
}
export const setPurchaseAll= ()=>{
    return{
        type: actionTypes.PURCHASE_ALL
    }
}
export const checkPurchasable = (index)=>{
    return {
        type: actionTypes.CHECK_PURCHASABLE,
        slipIndex: index
    }
}

export const deleteAndResetAll = ()=>{
    return {
        type: actionTypes.DELETE_AND_RESET_ALL
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

export const copyBetslip = (position) =>{
    return { 
        type: actionTypes.COPY_BETSLIP,
        position: position
    };
}


export const removeRowFromBetSlip = (deleteId) =>{
    return {
        type: actionTypes.REMOVE_ROW_FROM_BETSLIP,
        deleteId : deleteId
    };
}
