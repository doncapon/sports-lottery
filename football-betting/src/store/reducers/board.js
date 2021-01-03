import * as actionTypes from "../actions/actionTypes";
import produce from 'immer';
import _ from "lodash";

const initialStte = {

    slips : [
             {
                id:  "slip_1",
                purchasable: false,
                price: 0,
                editing: true,
                adding: false,
                removing: false,
                "slip_1":  { 
                            games: [
                                {
                                    id: "game_1",
                                    amount: 0,
                                    "game_1": {
                                            team1 : 'Manchester United',
                                            team2: 'Watford FC' ,
                                            isValid: false,
                                            sides: [ {selected : false}, {selected : false}, {selected : false} ],
                                    }
                                },
                                {
                                    id: "game_2",
                                    amount: 0,     
                                    "game_2": {
                                            team1 : 'Chelsea',
                                            team2: 'Arsenal',  
                                            isValid: false,
                                            sides: [ {selected : false}, {selected : false}, {selected : false} ],
                                    }
                                },
                                {
                                    id: "game_3",
                                    amount: 0,
                                    "game_3": { 
                                            team1 : 'Real Madrid', 
                                            team2: 'Barcelona',
                                            isValid: false,
                                            sides: [{selected : false}, {selected : false}, {selected : false} ]
                                    }
                                },
                                // {
                                //     id: "game_4",
                                //     amount: 0,
                                //     "game_4": { 
                                //             team1 : 'Leicester city', 
                                //             team2: 'Manchester city', 
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_5",
                                //     amount: 0,
                                //     "game_5": { 
                                //             team1 : 'Wolverhampton wonderers', 
                                //             team2: 'Stoke city', 
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_6",
                                //     amount: 0,
                                //     "game_6": { 
                                //             team1 : 'Liverpool', 
                                //             team2: 'Newcastle United',
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_7",
                                //     amount: 0,
                                //     "game_7": { 
                                //             team1 : 'Watford', 
                                //             team2: 'Burnley FC',  
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_8",
                                //     amount: 0, 
                                //     "game_8": { 
                                //             team1 : 'Everton', 
                                //             team2: 'Tottenham HotSpur',  
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_9",
                                //     amount: 0,
                                //     "game_9": {
                                //             team1 : 'Crystal Palace', 
                                //             team2: 'HuddersField',  
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_10",
                                //     amount: 0,
                                //     "game_10": {
                                //             team1 : 'West Bromich Abion', 
                                //             team2: 'WestHam United',  
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_11",
                                //     amount: 0,
                                //     "game_11": { 
                                //             team1 : 'Espanol', 
                                //             team2: 'Getafe', 
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_12",
                                //     amount: 0,
                                //     "game_12": {
                                //             team1 : 'Southhampton', 
                                //             team2: 'BrentFord',
                                //             isValid: false,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // }
                            ]   
                    }
            }
    ],
    editIndex : 0,
    totalPrice: 0,
    purchaseAll: false,
    basePrice: 25,
};

const addEmptySlip= (state, action)=>{
    return produce(state, draft =>{
        const clonedSlips = _.cloneDeep(state.slips);
    let lastLength = state.slips.length;
    const clonedSlip = clonedSlips[lastLength-1];
    let oldId = clonedSlip.id;
    let newId = "slip_" + (parseInt((oldId.split('_')[1])) + 1);
    const games =  clonedSlip["slip_"+ lastLength].games;
    const  side = {selected : false};
    const len = 3;
    for(let i = 0; i < games.length; i++){
        for(let k = 0 ; k < len; k++){
            games[i]["game_" + (i+1)].sides.push(side);
        }
        games[i]["game_" + (i+1)].sides.splice(0,3);
    }
    clonedSlip.purchasable = false
    clonedSlip[newId] = clonedSlip[oldId];
    delete[clonedSlip[oldId]];

    draft.slips.splice(lastLength, 1, clonedSlip);

    });
}

const deleteAndResetAll = (state, action)=>{
    return produce(state, draft => {
        const clonedSlips = _.cloneDeep(state.slips);
        if(state.slips.length>1){

            clonedSlips.splice(1, state.slips.length) ;
        }

        if(clonedSlips.length <=1){
        const games = _.cloneDeep(clonedSlips[0]["slip_1"].games);
        const  side = {selected : false};
        const len = 3;
        for(let i = 0; i < games.length; i++){
            for(let k = 0 ; k < len; k++){
                games[i]["game_" + (i+1)].sides.push(side);
            }
            games[i]["game_" + (i+1)].sides.splice(0,3);
        }
    
        clonedSlips[0]["slip_1"].games = games;
        clonedSlips[0].purchasable = false

        }
        draft.slips = _.cloneDeep(clonedSlips);
    })
}

const toggleSelectedTile = (state, action) =>{   
    return produce (state, draft =>{
        draft.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)]
        .games[action.gameIndex]['game_' + (action.gameIndex+ 1)]
        .sides[action.sideIndex].selected = !action.side;
    });
}


const calculateSlipPrice = (state, action) =>{
    return produce (state, draft =>{
        let side = draft.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)]
        .games[action.gameIndex]['game_' + (action.gameIndex+ 1)]
        .sides[action.sideIndex].selected;
        let game = draft.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)]
        .games[action.gameIndex];
        
        let totalPrice = state.slips[action.slipIndex].price;
        let purchasable = state.purchaseAll;
        if(purchasable && totalPrice === 0){
            totalPrice = draft.basePrice;
        }

          
        if(side){
            game.amount += 1;
        }else{
            game.amount -= 1;
        }

        if(purchasable && totalPrice > 0)
        {
            if(side){
                if(game.amount === 2){
                    totalPrice *=2;
                }else if(game.amount ===3){
                    totalPrice *= 1.5;
                }
            }else{
                if(game.amount === 1){
                    totalPrice /=2;
                }else if(game.amount ===2){
                    totalPrice /= 1.5;
                }
            }
        }
        draft.slips[action.slipIndex].price = totalPrice;
    });
}

const calculateGrandTtoalPriceOfAllSlips = (state, action) =>{
    return produce(state, draft=>{
        let slips = state.slips;
        let totalPrice =0;
        slips.forEach((slip, i ) =>{
            totalPrice += slip.price;
        });
    
        draft.totalPrice = totalPrice;
    })
}
const removeRowFromBetSlip = (state, action) =>{
    return produce(state, draft=>{
        if(draft.slips.length > 1){
            const clonedSlips = _.cloneDeep(draft.slips);
            let len = clonedSlips.length;
            let remainderLen = len- action.deleteId -1;
            clonedSlips.splice(action.deleteId, 1) ;
            let newId = "slip_";
            let oldId = "slip_"
            for(let i = 0 ; i < remainderLen; i++ ){
                    let k = i + action.deleteId;
                    newId += (k+1);
                    oldId += (k + 2);
                    clonedSlips[k].id = newId;
                    clonedSlips[k][newId] = clonedSlips[k][oldId];
                    delete(clonedSlips[k][oldId]);
                    newId = 'slip_';
                    oldId = "slip_" ;
            }
                draft.slips = _.cloneDeep(clonedSlips);
        }else{
            const games = _.cloneDeep(state.slips[0]["slip_1"].games);
            if(state.slips.length <= 1){

                const  side = {selected : false};
                const len = 3;
                for(let i = 0; i < games.length; i++){
                    for(let k = 0 ; k < len; k++){
                        games[i]["game_" + (i+1)].sides.push(side);
                    }
                    games[i]["game_" + (i+1)].sides.splice(0,3);
                }
                draft.slips[0]["slip_1"].games = games;
                draft.slips[0].purchasable = false
            }
        }
   });
   
}

const setEditIndex = (state, action) =>{
        return { ...state,
            editIndex : action.position
        }  
}

const setAdding=(state, action) =>{
    return produce(state, draft =>{
        draft.slips[action.slipIndex].adding = action.isAdded
    })
}

const setRemoving=(state, action) =>{
    return produce(state, draft =>{
    
        draft.slips[action.slipIndex].removing = action.removing
    })
}

const addRowToBetSlip = (state, action) =>{
    return produce( state, draft =>{

        
        const oldId = "slip_" + ( action.position + 1);
        const newId =  "slip_" + (draft.slips.length + 1);
        let clonedSlips = _.cloneDeep(draft.slips);
        let updatedSlip =  _.cloneDeep(clonedSlips[action.position]);
        let clonedUpdatedSlip = _.cloneDeep(updatedSlip[oldId]);
        let newslip = _.cloneDeep(clonedUpdatedSlip);
        
        draft.slips.splice (draft.slips.length ,0, { id: newId, purchasable: true,price: state.slips[action.position].price, adding: false,removing: false, [newId] : newslip});
        console.log(state.slips);
    
    });
}

const sideIsValid=(sides)=>{
    let allValid = false;
    for(let side of sides){
        if(side.selected === true){
            allValid =  true;
            break;
        }
    }
    return allValid;
}

const checkPurchasable=(state, action)=>{
     
       return produce(state, draft=>{
        let purchasable = true;

        const slip = state.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)];
        for(let i = 0 ; i < slip.games.length; i++){
            const isPurse = sideIsValid(slip.games[i]["game_"+ (i+1)].sides);
            if(!isPurse){
                purchasable = false;
                break;
            }
        }
           draft.slips[action.slipIndex].purchasable = purchasable
       });
}



const setPurchaseAll = (state, action)=>{
    return produce(state, draft =>{
        let purchase = true;
        for(let i = 0 ; i < state.slips.length; i++){
            let purchasable = true;
            const slip = state.slips[i]["slip_" + (i + 1)];
                for(let k = 0 ; k < slip.games.length; k++){
                    const isPurse = sideIsValid(slip.games[k]["game_"+ (k+1)].sides);
                    if(!isPurse){
                        purchasable = false;
                        break;
                    }
                }

            if( !purchasable){
                purchase = false;
                break;
            }
        }
        draft.purchaseAll = purchase;

    })
}


const reducer = (state = initialStte, action) =>{
    switch (action.type){
        case actionTypes.ADD_EMPTY_SLIP:
            return addEmptySlip(state,action);
        case actionTypes.SET_EDITING_INDEX:
            return setEditIndex(state , action);
        case actionTypes.SET_ADDING:
            return setAdding(state, action);
        case actionTypes.SET_REMOVING:
            return setRemoving(state, action);
        case actionTypes.TOGGLE_SELECTED_TILE:
            return toggleSelectedTile(state, action);
        case actionTypes.ADD_ROW_TO_BETSLIP:
            return addRowToBetSlip(state, action);
        case actionTypes.REMOVE_ROW_FROM_BETSLIP:
            return removeRowFromBetSlip(state, action);
        case actionTypes.CHECK_PURCHASABLE:
            return checkPurchasable(state, action);
        case actionTypes.PURCHASE_ALL:
            return setPurchaseAll(state, action);
        case actionTypes.DELETE_AND_RESET_ALL:
            return deleteAndResetAll(state, action);
        case actionTypes.CALCULATE_SLIP_PRICE:
            return calculateSlipPrice(state, action);
        case actionTypes.CALCULAT_GRAND_tOTAL:
            return calculateGrandTtoalPriceOfAllSlips(state,action);
       default: 
            return state;
    }
}
export default reducer;