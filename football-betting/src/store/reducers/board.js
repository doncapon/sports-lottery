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
                                    "game_1": {
                                            team1 : 'Manchester United',
                                            team2: 'Watford FC' ,
                                            isValid: false,
                                            amount: 0,
                                            sides: [ {selected : false}, {selected : false}, {selected : false} ],
                                    }
                                },
                                {
                                    id: "game_2",
                                    "game_2": {
                                            team1 : 'Chelsea',
                                            team2: 'Arsenal',  
                                            isValid: false,
                                            amount: 0,     
                                            sides: [ {selected : false}, {selected : false}, {selected : false} ],
                                    }
                                },
                                // {
                                //     id: "game_3",
                                //     "game_3": { 
                                //             team1 : 'Real Madrid', 
                                //             team2: 'Barcelona',
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_4",
                                //     "game_4": { 
                                //             team1 : 'Leicester city', 
                                //             team2: 'Manchester city', 
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_5",
                                //     "game_5": { 
                                //             team1 : 'Wolverhampton wonderers', 
                                //             team2: 'Stoke city', 
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_6",
                                //     "game_6": { 
                                //             team1 : 'Liverpool', 
                                //             team2: 'Newcastle United',
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_7",
                                //     "game_7": { 
                                //             team1 : 'Watford', 
                                //             team2: 'Burnley FC',  
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_8",
                                //     "game_8": { 
                                //             team1 : 'Everton', 
                                //             team2: 'Tottenham HotSpur',  
                                //             isValid: false,
                                //             amount: 0, 
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_9",
                                //     "game_9": {
                                //             team1 : 'Crystal Palace', 
                                //             team2: 'HuddersField',  
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_10",
                                //     "game_10": {
                                //             team1 : 'West Bromich Abion', 
                                //             team2: 'WestHam United',  
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_11",
                                //     "game_11": { 
                                //             team1 : 'Espanol', 
                                //             team2: 'Getafe', 
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     id: "game_12",
                                //     "game_12": {
                                //             team1 : 'Southhampton', 
                                //             team2: 'BrentFord',
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // }
                            ]   
                    }
            }
    ],
    editIndex : 0,
    totalPrice: 1,
    purchaseAll: false,
};

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

            for(let i = 0; i < games.length; i++){
                for(let k = 0 ; k < games[i]["game_" + (i+1)].sides.length; k++){
                    delete(games[i]["game_" + (i+1)].sides[k].selected)
                }
            }
       
            draft.slips[0]["slip_1"].games = games;
            draft.slips[0].purchasable = false
        }
   });
   
}

const setEditIndex = (state, action) =>{
        return { ...state,
            editIndex : action.position,
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
        
        draft.slips.splice (draft.slips.length ,0, { id: newId,adding: false,removing: false, [newId] : newslip});

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



const toggleSelectedTile = (state, action) =>{   
    return produce (state, draft =>{
        draft.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)]
        .games[action.gameIndex]['game_' + (action.gameIndex+ 1)]
        .sides[action.sideIndex].selected = !action.side;
    });
}

const reducer = (state = initialStte, action) =>{
    switch (action.type){
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
       default: 
            return state;
    }
}
export default reducer;