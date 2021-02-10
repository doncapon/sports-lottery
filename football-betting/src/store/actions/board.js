import * as actionTypes from './actionTypes';
import axios from '../../axios-fixtures';
// import { getNextPlayDate } from '../../shared/utility';


export const genrateSlip = (amount, slipIndex, basePrice ) =>{
    return dispatch =>{
        dispatch(EmptyEditingISlip());
        dispatch(genrateSlip2(amount, basePrice));
        dispatch(setPurchaseAll());
        dispatch(calculateSpecificSlipPrice(slipIndex, basePrice));
        dispatch(calculateGrandTtoalPriceOfAllSlips());

    }
}

export const genrateSlip2 = (amount, basePrice) =>{
    return {
        type: actionTypes.GENERATE_SLIP,
        amount: amount,
        basePrice: basePrice,
    }
}

export const setBoard=(isFaCup , kickOffTime , kickOffDate ) =>{
    // let kickOffDate = getNextPlayDate( daysOffset, hourstoNext);
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
            
            
            let PremierShipOrFACup;
            if(!isFaCup)    {
                PremierShipOrFACup = EnglandFixtures.filter(fixture => fixture.league.name === "Premier League");
            }else{
                PremierShipOrFACup = EnglandFixtures.filter(fixture => fixture.league.name === "FA Cup");
            }
            

            let Championship = EnglandFixtures.filter(fixture => fixture.league.name === "Championship");
            let countWanted;

            if((Championship.length + PremierShipOrFACup.length) < 13)
            countWanted = Championship.length + PremierShipOrFACup.length;
            else
            countWanted = 13;

            let premCount= 7;
            let ChamCount = 6;
            if(countWanted === 13){
                if(Championship.length < 6)
                    premCount = countWanted - Championship.length;
                if(PremierShipOrFACup.length < 7)
                    ChamCount = countWanted - PremierShipOrFACup.length;
            }else{
                if(Championship.length < 5)
                    premCount = countWanted - Championship.length;
                if(PremierShipOrFACup < 6)
                    Championship = countWanted - PremierShipOrFACup.length;
            }
            let wantedFixtures = PremierShipOrFACup.splice(0, premCount).concat(Championship.splice(0, ChamCount));
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
export const setFixtureIds = ()=>{
    return {
        type: actionTypes.SET_FIXTURE_IDS

    }
}
export const setIsToWallet = (isToWallet)=>{
    return {
        type: actionTypes.SET_ISTOWALLET,
        isToWallet: isToWallet,

    }
}

export const creditFunds = (funds)=>{
    return {
        type: actionTypes.CREDIT_FUNDS,
        funds: funds

    }
}

export const debitFunds = (funds)=>{
    return {
        type: actionTypes.DEBIT_FUNDS,
        funds: funds

    }
}

export const resetReduxBoard=()=>{
    return {
        type: actionTypes.RESET_BOARD
    }
}
export const toggleShowFunds = () =>{
    return {
        type: actionTypes.TOGGLE_SHOWFUNDS,
    }
}

export const setShowFunds = (show) =>{
    return {
        type: actionTypes.SET_SHOW_FUNDS,
        show: show
    }
}

export const toggleIsShowReceipt = () =>{
    return {
        type: actionTypes.TOGGLE_SHOW_RECEIPT,
    }
}

export const setReceipt = (gameDay) =>{
    return {
        type: actionTypes.SET_RECEIPT,
        gameDay: gameDay
    }
}

export const toggleReceiptShowHistory = (receiptIndex) =>{
    return {
        type: actionTypes.TOGGLE_SHOW_RECEIPT_HISTORY,
        receiptIndex: receiptIndex
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
export const calculateOverAllPrice = (slipIndex, gameIndex, sideIndex, basePrice)=>{
    return dispatch =>{
        dispatch(calulateGameAmount(slipIndex, gameIndex, sideIndex));
        dispatch(calculateSpecificSlipPrice(slipIndex, basePrice))
        dispatch(calculateGrandTtoalPriceOfAllSlips(slipIndex));
    }
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

export const calculateSpecificSlipPrice = (slipIndex, basePrice) =>{
    return { 
        type : actionTypes.CALCULATE_EDIT_INDEX_PRICE, 
        slipIndex : slipIndex,
        basePrice: basePrice       
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
        type : actionTypes.CALCULATE_GRAND_tOTAL,
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
    return dispatch =>{
        dispatch(removeRowFromBetSlip2(deleteId));
        dispatch(calculateGrandTtoalPriceOfAllSlips());
    };
}

export const removeRowFromBetSlip2 = (deleteId) =>{
    return {
        type: actionTypes.REMOVE_ROW_FROM_BETSLIP,
        deleteId : deleteId
    };
}
