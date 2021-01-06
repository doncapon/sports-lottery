import * as actionTypes from './actionTypes';
import axios from '../../axios-predictions';

export const genrateSlip = (amount, ) =>{
    return dispatch =>{
        dispatch(EmptyEditingISlip());
        dispatch(genrateSlip2(amount));
        
        dispatch(setPurchaseAll());
        dispatch(calculateGrandTtoalPriceOfAllSlips());

    }
}
export const genrateSlip2 = (amount) =>{
    return {
        type: actionTypes.GENERATE_SLIP,
        amount: amount
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

export const EmptyEditingISlip =()=>{
    return dispatch =>{
        dispatch(EmptyEditingIndexSlip());
    }
}
export const toggleSelectedTile = (slipIndex, gameIndex,sideIndex, side) =>{
    return dispatch => { 
        dispatch(toggleSelectedTile2(slipIndex, gameIndex, sideIndex, side));
        dispatch(checkHasStartedPlaying());
    }
}
export const toggleSelectedTile2 = (slipIndex, gameIndex,sideIndex, side) =>{
    return { 
        type : actionTypes.TOGGLE_SELECTED_TILE,
        slipIndex: slipIndex,
        gameIndex : gameIndex,
        sideIndex : sideIndex,
        side: side
    };
}


export const checkHasStartedPlaying =()=>{
    return {
        type : actionTypes.CHECK_HAS_STARED
    }
}

export const EmptyEditingIndexSlip =()=>{
    return {
        type : actionTypes.EMPTY_EDITING_SLIP
    }
}
export const calculateOverAllPrice = (slipIndex, gameIndex, sideIndex)=>{
    return dispatch =>{
        dispatch(calculateSlipPrice(slipIndex, gameIndex, sideIndex));
        dispatch(calculateGrandTtoalPriceOfAllSlips(slipIndex));
    }
}

export const setBoard=() =>{
    return dispatch =>{
        axios.get("predictions/157462" , {
            headers: {
                'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
              }
        })
        .then(response =>{
            // console.log(response);
          dispatch(initializeBoard(response.data.api.predictions));

        }).catch(error =>{

        });
    };
}

export const initializeBoard = (predictions) =>{
    return { 
        type : actionTypes.INITIALIZE_BOARD,
        predictions: predictions
    };
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


export const deleteAndResetAll = ()=>{
    return {
        type: actionTypes.DELETE_AND_RESET_ALL
    }
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
