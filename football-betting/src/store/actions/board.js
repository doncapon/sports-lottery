import * as actionTypes from './actionTypes';
import axios from '../../axios-fixtures';
import { getNextPlayDate } from '../../shared/utility';


export const genrateSlip = (amount, slipIndex ) =>{
    return dispatch =>{
        dispatch(EmptyEditingISlip());
        dispatch(genrateSlip2(amount));

        dispatch(setPurchaseAll());
        dispatch(calculateSpecificSlipPrice(slipIndex));
        dispatch(calculateGrandTtoalPriceOfAllSlips());

    }
}

export const toggleIsShowReceipt = () =>{
    return {
        type: actionTypes.TOGGLE_SHOW_RECEIPT,
    }
}

export const setReceipt = () =>{
    return {
        type: actionTypes.SET_RECEIPT,
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

export const setIsPaying = (isPaying)=>{
    return {
        type: actionTypes.SET_ISPAYING,
        isPaying: isPaying
    }
}

export const executePurchase= ()=>{
    return {
        type: actionTypes.EXECUTE_PURCHASE
    }
}
export const setIsPaid = (isPaid)=>{
    return {
        type: actionTypes.SET_ISPAID,
        isPaid: isPaid
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
        dispatch(calulateGameAmount(slipIndex, gameIndex, sideIndex));
        dispatch(calculateSpecificSlipPrice(slipIndex))
        dispatch(calculateGrandTtoalPriceOfAllSlips(slipIndex));
    }
}

export const setBoard=( kickOffDay, kickOffTime) =>{
    let kickOffDate = getNextPlayDate(kickOffDay);
    return dispatch =>{
        axios.get("fixtures/date/"+ kickOffDate
         ,
        {
            headers: {
                'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
              }
        })
        .then(response =>{

            let dateTime = ( kickOffDate +"T"+kickOffTime);
            let fixtureAtTime = response.data.api.fixtures.filter(
                fixture =>fixture.event_date === dateTime);
            let EnglandFixtures =fixtureAtTime.filter(fixture =>fixture.league.country === "England" );
            let PremierShip = EnglandFixtures.filter(fixture => fixture.league.name === "Premier League");
            let Championship = EnglandFixtures.filter(fixture => fixture.league.name === "Championship");
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
            let countAfter = wantedFixtures.length;
            if(wantedFixtures.length < 13){
                let leagueOneFixture = EnglandFixtures.filter(fixture => fixture.league.name === "League One");
                wantedFixtures = wantedFixtures.concat(leagueOneFixture.splice(0, (13 - countAfter)));
            }
            let counterAFterLeagueOne = wantedFixtures.length;
            if(wantedFixtures.length < 13){
                let leagueTwoFixture = EnglandFixtures.filter(fixture => fixture.league.name === "League Two");
                wantedFixtures = wantedFixtures.concat(leagueTwoFixture.splice(0, (13 - counterAFterLeagueOne)));
            }
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


export const calulateGameAmount = (slipIndex, gameIndex,sideIndex) =>{
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
