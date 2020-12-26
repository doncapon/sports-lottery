import * as actionTypes from "../actions/actionTypes";
import produce from 'immer';
import _ from "lodash";
// import {updateObject} from '../../shared/utility';



const initialStte = {

    slips : [
             {
                "slip1":  { 
                            id:  "slip1",
                            price: 0,
                            games: [
                                {
                                    "game1": {
                                            id: "game1",
                                            team1 : 'Manchester United',
                                            team2: 'Watford FC' ,
                                            isValid: false,
                                            amount: 0,
                                            sides: [ {selected : false}, {selected : false}, {selected : false} ],
                                    }
                                },
                                {
                                    "game2": {
                                            id: "game2",
                                            team1 : 'Chelsea',
                                            team2: 'Arsenal',  
                                            isValid: false,
                                            amount: 0,     
                                            sides: [ {selected : false}, {selected : false}, {selected : false} ],
                                    }
                                },
                                {
                                    "game3": { id: "game3",
                                            team1 : 'Real Madrid', 
                                            team2: 'Barcelona',
                                            isValid: false,
                                            amount: 0,
                                            sides: [{selected : false}, {selected : false}, {selected : false} ]
                                    }
                                },
                                // {
                                //     "game4": { id: "game4",
                                //             team1 : 'Leicester city', 
                                //             team2: 'Manchester city', 
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game5": { id: "game5",
                                //             team1 : 'Wolverhampton wonderers', 
                                //             team2: 'Stoke city', 
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game6": { id: "game6",
                                //             team1 : 'Liverpool', 
                                //             team2: 'Newcastle United',
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game7": { id: "game7",
                                //             team1 : 'Watford', 
                                //             team2: 'Burnley FC',  
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game8": { id: "game8",
                                //             team1 : 'Everton', 
                                //             team2: 'Tottenham HotSpur',  
                                //             isValid: false,
                                //             amount: 0, 
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game9": { id: "game9",
                                //             team1 : 'Crystal Palace', 
                                //             team2: 'HuddersField',  
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game10": { id: "game10",
                                //             team1 : 'West Bromich Abion', 
                                //             team2: 'WestHam United',  
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game11": { id: "game11",
                                //             team1 : 'Espanol', 
                                //             team2: 'Getafe', 
                                //             isValid: false,
                                //             amount: 0,
                                //             sides: [{selected : false}, {selected : false}, {selected : false} ]
                                //     }
                                // },
                                // {
                                //     "game12": { id: "game12",
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
    totalPrice: 1,
    adding: false
};

const addRowToBetSlip = (state, action) =>{
   
    
    return produce( state, draft =>{
        const oldId = "slip" + ( action.position + 1);
        const newId =  "slip" + (draft.slips.length + 1)
        console.log(newId);
        let clonedSlips = _.cloneDeep(draft.slips);
        let updatedSlip =  _.cloneDeep(clonedSlips[action.position]);
        let clonedUpdatedSlip = _.cloneDeep(updatedSlip[oldId]);
        let newslip = _.cloneDeep(clonedUpdatedSlip);
            newslip.id = newId;
        
        draft.slips.splice (draft.slips.length ,0, {[newId] : newslip});
    });

    
}


const toggleSelectedTile = (state, action) =>{   
    return produce (state, draft =>{
        draft.slips[action.slipIndex]["slip" + (action.slipIndex + 1)]
        .games[action.gameIndex]['game' + (action.gameIndex+ 1)]
        .sides[action.sideIndex].selected = !action.side;
    });
}


const setAdding= (state, action) =>{
    // let updatedSlips = [...state.slips];
    // const updatedChangingSlip = action.changingSlip;
    // updatedSlips.splice(updatedChangingSlip.index,0, updatedChangingSlip.value)

    return produce(state, draft => { 
         draft.adding =  action.adding
         draft.changingSlip = action.changingSlip 
        });
}


const removeRowFromBetSlip = (state, action) =>{
    // const updateSlip = [...state.betSlip];
    // updateSlip.filter((slip)=>{
    //     return  slip.index !== action.slipId
    // } );
    // return updateObject (state, ...updateSlip);
}



const ableToSend = (state, action) =>{
    // return updateObject (state , {
    //     isAlreadySent : false
    // });
}

const reducer = (state = initialStte, action) =>{
    switch (action.type){
        case actionTypes.ABLE_TO_SEND:
            return ableToSend(state, action);
        case actionTypes.TOGGLE_SELECTED_TILE:
            return toggleSelectedTile(state, action);
        case actionTypes.REMOVE_ROW_FROM_BETSLIP:
            return removeRowFromBetSlip(state, action);
        case actionTypes.ADD_ROW_TO_BETSLIP:
            return addRowToBetSlip(state, action);
        case actionTypes.SET_ADDING:
            return setAdding(state, action);
       default: 
       return state;
    }
}


export default reducer;