import * as actionTypes from "../actions/actionTypes";
import produce from 'immer';
import _ from "lodash";

const initialStte = {

    slips : [
             {
                id:  "slip_1",
                purchasable: false,
                price: 0,
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
    playingIndex: 0,
    totalPrice: 1,
    disableAdd : false
};

const setPlayingIndex = (state, action)=>{
    produce(state, draft =>{
        draft.playingIndex = action.position;
    })
}


const sideIsValid=(sides)=>{
    for(let side of sides){
        if(side.selected === true){
            return true;
        }
    }
    return false;
}

const isPurchasable=(state, action)=>{
     
       return produce(state, draft=>{
        let isValid = true;

        const slip = state.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)];
        for(let i = 0 ; i < slip.games.length; i++){
            const isPurse = sideIsValid(slip.games[i]["game_"+ (i+1)].sides);
            if(!isPurse){
                 isValid = false;
                 break;
            }
        }
           draft.slips[action.slipIndex].purchasable = isValid
       });
}


const disableAddButtons = (state, action)=>{
    return produce(state, draft =>{
            let isValid = true;
            for(let i = 0 ; i < state.slips.length; i++){
                if( !draft.slips[i].purchasable){
                    isValid = false;
                    break;
                }
            }
        draft.disableAdd = isValid
    })
}

const addRowToBetSlip = (state, action) =>{
    return produce( state, draft =>{
        const oldId = "slip_" + ( action.position + 1);
        const newId =  "slip_" + (draft.slips.length + 1)
        let clonedSlips = _.cloneDeep(draft.slips);
        let updatedSlip =  _.cloneDeep(clonedSlips[action.position]);
        let clonedUpdatedSlip = _.cloneDeep(updatedSlip[oldId]);
        let newslip = _.cloneDeep(clonedUpdatedSlip);
        
        draft.slips.splice (draft.slips.length ,0, { id: newId, [newId] : newslip});
    });
}


const removeRowFromBetSlip = (state, action) =>{
    return produce(state, draft=>{
        const clonedSlips = _.cloneDeep(draft.slips);
        const filteredSlips =  clonedSlips.filter((slip, i)=>{
            return slip.id !==  action.deleteId;
            });
        draft.slips = filteredSlips;
   });
   
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
        case actionTypes.TOGGLE_SELECTED_TILE:
            return toggleSelectedTile(state, action);
        case actionTypes.ADD_ROW_TO_BETSLIP:
            return addRowToBetSlip(state, action);
        case actionTypes.REMOVE_ROW_FROM_BETSLIP:
            return removeRowFromBetSlip(state, action);
        case actionTypes.DISABLE_ADD_BUTTONS:
            return disableAddButtons(state,action);
        case actionTypes.IS_PURCHASABLE:
            return isPurchasable(state, action);
        case actionTypes.SET_PLAYING_INDEX:
            return setPlayingIndex(state, action);
       default: 
       return state;
    }
}
export default reducer;