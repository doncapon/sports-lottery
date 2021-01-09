import * as actionTypes from './actionTypes';
import axios from '../../axios-fixtures';
// import moment from 'moment'


export const genrateSlip = (amount, slipIndex ) =>{
    return dispatch =>{
        dispatch(EmptyEditingISlip());
        dispatch(genrateSlip2(amount));

        dispatch(setPurchaseAll());
        dispatch(calculateSpecificSlipPrice(slipIndex));
        dispatch(calculateGrandTtoalPriceOfAllSlips());

    }
}
export const genrateSlip2 = (amount) =>{
    return {
        type: actionTypes.GENERATE_SLIP,
        amount: amount
    }
}

export const toggleShowHistory = (gameIndex) =>{
    return {
        type: actionTypes.TOGGLE_SHOW_HISTORY,
        gameIndex: gameIndex
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
// const getNextPlayDate=(day="saturday")=>{
//     let i;
//     if(day === "tuesday")
//     i = 2;
//     if(day === "saturday")
//     i = 6;
//     var d = new Date();
//     d.setDate(d.getDate() + (i + 7 - d.getDay()) % 7);
//     console.log(moment(d).format("YYYY-MM-DD"));
//     return moment(d).format("YYYY-MM-DD");
// }
export const setBoard=() =>{
    return dispatch =>{
        axios.get("fixtures/date/2021-01-16"
        // +getNextPlayDate("tuesday")
         ,
        {
            headers: {
                'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
              }
        })
        .then(response =>{
            let EnglandFixtures = response.data.api.fixtures
            .filter(fixture =>fixture.league.country === "England" );
            let Championship = EnglandFixtures.filter(fixture => fixture.league.name === "Championship");
            let PremierShip = EnglandFixtures.filter(fixture => fixture.league.name === "Premier League");
            let countWanted;
            if((Championship.length + PremierShip.length) < 13)
            countWanted = Championship.length + PremierShip.length;
            else
            countWanted = 13;

            let premCount= 7;
            let ChamCount = 6;
            if(countWanted === 13){
                if(Championship.length < 6)
                    premCount = countWanted - Championship.length;
                if(PremierShip.length < 7)
                    ChamCount = countWanted - PremierShip.length;
            }else{
                if(Championship.length < 5)
                    premCount = countWanted - Championship.length;
                if(PremierShip < 6)
                    Championship = countWanted - PremierShip.length;
            }
            let wantedFixtures = PremierShip.splice(0, premCount).concat(Championship.splice(0, ChamCount));
            
            dispatch(initializeBoard(wantedFixtures));
        }).catch(error =>{

        });
    };
}

export const initializeBoard = (fixtures) =>{
    return { 
        type : actionTypes.INITIALIZE_BOARD,
        fixtures: fixtures
    };
}

export const addEmptySlip = () =>{
    return { 
        type : actionTypes.ADD_EMPTY_SLIP,
        
    };
}

export const calculateSpecificSlipPrice = (slipIndex) =>{
    return { 
        type : actionTypes.CALCULATE_EDIT_INDEX_PRICE, 
        slipIndex : slipIndex       
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
