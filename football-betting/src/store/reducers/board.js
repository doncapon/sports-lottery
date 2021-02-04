import * as actionTypes from "../actions/actionTypes";
import produce from 'immer';
import _ from "lodash";
import {uuid} from '../../shared/utility'
import moment from 'moment';

const initialStte = {

    slips: null,
    // [ 

    //  {
    //                 id:  "slip_1",
    //                 purchasable: false,
    //                 slipPrice: 0,
    //                 adding: false,
    //                 removing: false,
    //                 "slip_1":  { 
    //                             games: [
    //                                 {
    //                                     id: "game_1",
    //                                     showHistory: false,
    //                                     amount: 0,
    //                                     "game_1": {
    //                                             team1 : 'Manchester United',
    //                                             team2: 'Watford FC' ,
    //                                             isValid: false,
    //                                             sides: [ {selected : false}, {selected : false}, {selected : false} ],
    //                                     }
    //                                 },

    //                            ]   
    //                   }
    //            }
    // ],
    receipts: null,
    editIndex: 0,
    totalPrice: 0,
    purchaseAll: false,
    loading: false,
    isStarted: false,
    gamesLength: null,
    isPaying: false,
    funds: 15500,
    isPaid: false,
    isShowReceipt: false,
    gameDate: null,
    gameDateRaw: null,
    isToWallet: true,
    
    showFunds:  true,

};

const setIsToWallet = (state, action) =>{
    return produce(state, draft=>{
        draft.isToWallet = action.isToWallet;
    });
}
const creditFunds = (state, action) =>{
    return produce(state, draft=>{
        draft.funds += action.funds;
    })
}

const debitFunds = (state, action) =>{
    return produce(state, draft=>{
        draft.funds -= action.funds;
    })
}

const resetReduxBoard = (state, action) =>{
    return produce(state, draft=>{
        draft.slips = null;
    })
}
const setShowFunds = (state, action) => {
    return produce(state, draft => {
        draft.showFunds = action.show;
    });
}

const toggleShowFunds = (state, action) => {
    return produce(state, draft => {
        draft.showFunds = !draft.showFunds
    });
}
const toggleIsShowReceipt = (state, action) => {
    return produce(state, draft => {
        draft.isShowReceipt = !draft.isShowReceipt
    });
}
const setReceipt = (state, action) => {
    return produce(state, draft => {
        draft.receipts = _.cloneDeep(draft.slips);
        for(let i = 0; i < draft.slips.length; i++){
            draft.slips[i].gameNumber = uuid();
        }
    })
}
const executePurchase = (state, action) => {
    return produce(state, draft => {
        draft.funds -= draft.totalPrice;
    })
}
const setIsPaid = (state, action) => {
    return produce(state, draft => {
        draft.isPaid = action.isPaid;

    })
}

const setIsPaying = (state, action) => {
    return produce(state, draft => {
        draft.isPaying = action.isPaying;
    })
}
const initializeBoard = (state, action) => {

    return produce(state, draft => {

        let slipId = "slip_";
        let games1 = [];
        let gameId = "game_";
        action.fixtures.forEach((fixture, i) => {
            let game = {
                id: gameId + (i + 1),
                amount: 0,
                fixture_id: fixture.fixture_id,
                status: fixture.status,
                [gameId + (i + 1)]: {
                    team1_id: fixture.homeTeam.team_id,
                    team1: fixture.homeTeam.team_name,
                    team2_id: fixture.awayTeam.team_id,
                    team2: fixture.awayTeam.team_name, isValid: false,
                    sides: [{ selected: false }, { selected: false }, { selected: false }],
                }
            };
            
            games1.splice(i, i + 1, game);
        });
        let slipInner = Object.assign({}, { games: games1 });
        let newSlip = Object.assign({}, {
            id: (slipId + 1), purchasable: false, slipAmount: 0,
            slipPrice: 0, adding: false, removing: false, [slipId + 1]: slipInner
        });
        newSlip.games = Object.assign([], games1);

        newSlip.gameNumber = uuid();
        // let newSlips = [Object.assign({}, newSlip)];
        let newSlips = [];
        newSlips.splice(0, 1, newSlip);
        draft.gamesLength = action.fixtures.length;
        draft.slips = Object.assign([], newSlips);
        draft.isPaying = false;
        draft.isPaid = false;
        draft.isShowReceipt = false;
        draft.gameDateRaw = action.fixtures[0].event_date;
        draft.gameDate = moment(action.fixtures[0].event_date).format("DD-MM-YYYY");
        draft.loading = true;

    });
}
const toggleShowHistory = (state, action) => {
    return produce(state, draft => {
        draft.slips[state.editIndex]["slip_" + (state.editIndex + 1)]
            .games[action.gameIndex].showHistory = !draft.slips[state.editIndex]["slip_" + (state.editIndex + 1)]
                .games[action.gameIndex].showHistory;
    })
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
const generateSlip = (state, action) => {
    return produce(state, draft => {
        let arrayGames = [[]];
        let clonedGames = draft.slips[state.editIndex]["slip_" + (state.editIndex + 1)].games;
        draft.slips[state.editIndex].slipPrice = action.basePrice;
        let gameRandom = getRandomInt(state.gamesLength);
        let rand2;
        for (let i = 0; i < 1; i++) {
            let temp = getRandomInt(state.gamesLength);
            if (gameRandom === temp) {
                continue;
            }
            rand2 = temp;
            break;
        }
        let amount = action.amount.split(' ')[0];
        let sides = [0, 0, 0];
        for (let i = 0; i < state.gamesLength; i++) {
            let rand = getRandomInt(3);
            sides[rand] = 1;
            arrayGames[i] = Object.assign([], sides);
            sides = [0, 0, 0];
        }
        arrayGames[gameRandom] = Object.assign([], [1, 1, 1]);
        if (amount === "480") {
            let attempt = 0;
            let InitialAttempt = 3;
            while (attempt < InitialAttempt) {
                let newRand = getRandomInt(arrayGames.length);
                let sideRand = getRandomInt(3);
                if (arrayGames[newRand][sideRand] === 1 || newRand === gameRandom ||
                    (arrayGames[newRand][0] + arrayGames[newRand][1] + arrayGames[newRand][2]) > 1) {
                    continue;
                }
                arrayGames[newRand][sideRand] = 1;
                attempt++;
            }
        } else if (amount === "1000") {
            let attempt = 0;
            let InitialAttempt = 4;

            while (attempt < InitialAttempt) {
                let newRand = getRandomInt(arrayGames.length);
                let sideRand = getRandomInt(3);
                if (arrayGames[newRand][sideRand] === 1 || newRand === gameRandom ||
                    (arrayGames[newRand][0] + arrayGames[newRand][1] + arrayGames[newRand][2]) > 1) {
                    continue;
                }
                arrayGames[newRand][sideRand] = 1;
                attempt++;
            }
        } else {
            let attempt = 0;
            let InitialAttempt = 3;
            arrayGames[rand2] = Object.assign([], [1, 1, 1]);

            while (attempt < InitialAttempt) {
                let newRand = getRandomInt(arrayGames.length);
                let sideRand = getRandomInt(3);
                if (arrayGames[newRand][sideRand] === 1 || newRand === gameRandom ||
                    newRand === rand2 ||
                    (arrayGames[newRand][0] + arrayGames[newRand][1] + arrayGames[newRand][2]) > 1) {
                    continue;
                }
                arrayGames[newRand][sideRand] = 1;
                attempt++;

            }
        }
        for (let i = 0; i < arrayGames.length; i++) {
            for (let k = 0; k < 3; k++) {
                if (arrayGames[i][k] === 1) {
                    clonedGames[i]["game_" + (i + 1)].sides[k].selected = true;
                } else {
                    clonedGames[i]["game_" + (i + 1)].sides[k].selected = false;
                }
            }
        }
        for (let i = 0; i < arrayGames.length; i++) {
            draft.slips[state.editIndex]["slip_" + (state.editIndex + 1)]
                .games[i].amount = arrayGames[i][0] + arrayGames[i][1] + arrayGames[i][2]
        }
        draft.slips[state.editIndex].purchasable = true;
        draft.slips[state.editIndex].gameNumber = uuid();
        draft.isPaying = false;
        draft.isPaid = false;
        draft.isShowReceipt = false;

    })
}

const calculateSpecificSlipPrice = (state, action) => {
    return produce(state, draft => {
        let games = draft.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)]
            .games;
        let slipAmount = 1;
        let totalPrice = action.basePrice;
        for (let i = 0; i < games.length; i++) {
            if (games[i].amount > 1) {
                totalPrice *= 2;
                slipAmount *= 2;
                if (games[i].amount > 2) {
                    totalPrice *= 1.5;
                    slipAmount *= 1.5;
                }
            }

        }
        draft.slips[action.slipIndex].slipAmount = slipAmount;
        draft.slips[action.slipIndex].slipPrice = totalPrice;
    });
}

const checkHasStartedPlaying = (state, action) => {
    return produce(state, draft => {


        const editSlip = _.cloneDeep(state.slips[state.editIndex]);
        const games = editSlip["slip_" + (state.editIndex + 1)].games;
        let hasStarted = false;
        for (let i = 0; i < games.length; i++) {
            for (let k = 0; k < games[i]["game_" + (i + 1)].sides.length; k++) {
                if (games[i]["game_" + (i + 1)].sides[k].selected) {
                    hasStarted = true;
                    break;
                }
            }
            if (hasStarted) {
                break;
            }
        }
        draft.isStarted = hasStarted;
    })
}
const EmptyEditingIndexSlip = (state, action) => {
    return produce(state, draft => {
        const editSlip = _.cloneDeep(state.slips[state.editIndex]);
        const games = editSlip["slip_" + (state.editIndex + 1)].games;

        const side = { selected: false };
        const len = 3;
        for (let i = 0; i < games.length; i++) {
            for (let k = 0; k < len; k++) {
                games[i]["game_" + (i + 1)].sides.push(side);
            }
            games[i]["game_" + (i + 1)].sides.splice(0, 3);
        }
        editSlip["slip_" + (state.editIndex + 1)].games = games;
        editSlip.purchasable = false;
        editSlip.slipPrice = 0;

        draft.slips[state.editIndex] = Object.assign({}, editSlip);
        draft.purchaseAll = false;
        draft.totalPrice = 0;
        draft.isStarted = true;
        draft.isPaying = false;
        draft.isPaid = false;
        draft.isShowReceipt = false;

    });
}

const checkPurchasable = (state, action) => {

    return produce(state, draft => {
        let purchasable = true;

        const slip = state.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)];
        for (let i = 0; i < slip.games.length; i++) {
            const isPurse = sideIsValid(slip.games[i]["game_" + (i + 1)].sides);
            if (!isPurse) {
                purchasable = false;
                break;
            }
        }
        draft.slips[action.slipIndex].purchasable = purchasable;
    });
}

const copyBetslip = (state, action) => {
    return produce(state, draft => {
        const oldId = "slip_" + (action.position + 1);
        const newId = "slip_" + (draft.slips.length + 1);
        let newslip = _.cloneDeep(draft.slips[action.position][oldId]);

        draft.slips.splice(draft.slips.length, 0, {
            id: newId, purchasable: true,
            slipPrice: state.slips[action.position].slipPrice, adding: false,
            removing: false, [newId]: newslip
        });

        draft.slips[draft.slips.length-1].gameNumber = uuid();
        draft.isPaying = false;
        draft.isPaid = false;
        draft.isShowReceipt = false;

    });
}


const addEmptySlip = (state, action) => {
    return produce(state, draft => {
        const clonedSlips = _.cloneDeep(state.slips);
        let lastLength = state.slips.length;
        const clonedSlip = clonedSlips[lastLength - 1];
        let oldId = clonedSlip.id;
        let newId = "slip_" + (parseInt((oldId.split('_')[1])) + 1);
        const games = clonedSlip["slip_" + lastLength].games;
        const side = { selected: false };
        const len = 3;
        for (let i = 0; i < games.length; i++) {
            for (let k = 0; k < len; k++) {
                games[i]["game_" + (i + 1)].sides.push(side);
            }
            games[i]["game_" + (i + 1)].sides.splice(0, 3);
            games[i].amount = 0;
        }
        clonedSlip.purchasable = false;
        clonedSlip.adding = false;
        clonedSlip.removing = false;
        clonedSlip.slipPrice = 0;
        clonedSlip.gameNumber = uuid();
        clonedSlip.id = newId;
        clonedSlip[newId] = clonedSlip[oldId];
        delete [clonedSlip[oldId]];

        draft.slips.splice(lastLength, 1, clonedSlip);
        draft.isPaying = false;
        draft.isPaid = false;
        draft.isShowReceipt = false;
        
    });
}

const deleteAndResetAll = (state, action) => {
    return produce(state, draft => {
        const clonedSlips = _.cloneDeep(state.slips);

        if (state.slips.length > 1) {

            clonedSlips.splice(1, state.slips.length);
        }

        if (clonedSlips.length <= 1) {
            const games = _.cloneDeep(clonedSlips[0]["slip_1"].games);
            const side = { selected: false };
            const len = 3;
            for (let i = 0; i < games.length; i++) {
                for (let k = 0; k < len; k++) {
                    games[i]["game_" + (i + 1)].sides.push(side);
                    games[i].amount = 0;
                }
                games[i]["game_" + (i + 1)].sides.splice(0, 3);
            }

            clonedSlips[0]["slip_1"].games = games;
            clonedSlips[0].purchasable = false
            clonedSlips[0].slipPrice = 0;
            clonedSlips[0].slipAmount = 0;
            
        }


        draft.slips = _.cloneDeep(clonedSlips);
        draft.totalPrice = 0;
        draft.purchaseAll = false;
        draft.isPaying = false;
        draft.isShowReceipt = false;


    })
}

const toggleSelectedTile = (state, action) => {
    return produce(state, draft => {
        draft.slips[action.slipIndex]["slip_" + (action.slipIndex + 1)]
            .games[action.gameIndex]['game_' + (action.gameIndex + 1)]
            .sides[action.sideIndex].selected = !action.side;
        draft.isPaying = false;
        draft.isPaid = false;
        draft.isShowReceipt = false;

    });
}

const calulateGameAmount = (state, action) => {
    return produce(state, draft => {
        let side = draft.slips[action.slipIndex]["slip_" +
            (action.slipIndex + 1)]
            .games[action.gameIndex]['game_' + (action.gameIndex + 1)]
            .sides[action.sideIndex].selected;
        let game = draft.slips[action.slipIndex]["slip_"
            + (action.slipIndex + 1)]
            .games[action.gameIndex];

        if (side) {
            game.amount += 1;
        } else {
            game.amount -= 1;
        }

    });
}

const calculateGrandTtoalPriceOfAllSlips = (state, action) => {
    return produce(state, draft => {
        let slips = state.slips;
        let totalPrice = 0;
        slips.forEach((slip, i) => {
            totalPrice += slip.slipPrice;
        });

        draft.totalPrice = totalPrice;
    })
}
const removeRowFromBetSlip = (state, action) => {
    return produce(state, draft => {
        if (draft.slips.length > 1) {
            const clonedSlips = _.cloneDeep(draft.slips);
            let len = clonedSlips.length;
            let initialPrice = clonedSlips[action.deleteId].slipPrice;

            let remainderLen = len - action.deleteId - 1;
            clonedSlips.splice(action.deleteId, 1);
            let newId = "slip_";
            let oldId = "slip_";
            for (let i = 0; i < remainderLen; i++) {
                let k = i + action.deleteId;
                newId += (k + 1);
                oldId += (k + 2);
                clonedSlips[k].id = newId;
                clonedSlips[k][newId] = clonedSlips[k][oldId];
                delete (clonedSlips[k][oldId]);
                newId = 'slip_';
                oldId = "slip_";
            }
            draft.slips = _.cloneDeep(clonedSlips);
            draft.totalPrice -= initialPrice;
        } else {
            const games = _.cloneDeep(state.slips[0]["slip_1"].games);
            if (state.slips.length <= 1) {

                const side = { selected: false };
                const len = 3;
                for (let i = 0; i < games.length; i++) {
                    for (let k = 0; k < len; k++) {
                        games[i]["game_" + (i + 1)].sides.push(side);
                    }
                    games[i]["game_" + (i + 1)].sides.splice(0, 3);
                }
                draft.slips[0]["slip_1"].games = games;
                draft.slips[0].purchasable = false
                draft.totalPrice = 0;
            }
        }
        draft.isPaying = false;
        draft.isPaid = false;
        draft.isShowReceipt = false;

    });

}

const setEditIndex = (state, action) => {
    return {
        ...state,
        editIndex: action.position,
        isPaying: false,
        isPaid: false,
        isShowReceipt: false,
    }
}

const setAdding = (state, action) => {
    return produce(state, draft => {
        draft.slips[action.slipIndex].adding = action.isAdded
    })
}

const setRemoving = (state, action) => {
    return produce(state, draft => {

        draft.slips[action.slipIndex].removing = action.removing
    })
}

const sideIsValid = (sides) => {
    let allValid = false;
    for (let side of sides) {
        if (side.selected === true) {
            allValid = true;
            break;
        }
    }
    return allValid;
}

const setPurchaseAll = (state, action) => {
    return produce(state, draft => {
        let purchase = true;
        for (let i = 0; i < state.slips.length; i++) {
            let purchasable = true;
            const slip = state.slips[i]["slip_" + (i + 1)];
            for (let k = 0; k < slip.games.length; k++) {
                const isPurse = sideIsValid(slip.games[k]["game_" + (k + 1)].sides);
                if (!isPurse) {
                    purchasable = false;
                    break;
                }
            }

            if (!purchasable) {
                purchase = false;
                break;
            }
        }
        draft.purchaseAll = purchase;

    })
}


const reducer = (state = initialStte, action) => {
    switch (action.type) {
        case actionTypes.RESET_BOARD:
            return resetReduxBoard(state, action);
        case actionTypes.TOGGLE_SHOWFUNDS:
            return toggleShowFunds(state, action);
        case actionTypes.TOGGLE_SHOW_RECEIPT:
            return toggleIsShowReceipt(state, action);
        case actionTypes.SET_RECEIPT:
            return setReceipt(state, action);
        case actionTypes.EXECUTE_PURCHASE:
            return executePurchase(state, action);
        case actionTypes.CALCULATE_EDIT_INDEX_PRICE:
            return calculateSpecificSlipPrice(state, action);
        case actionTypes.SET_ISPAID:
            return setIsPaid(state, action);
        case actionTypes.SET_ISPAYING:
            return setIsPaying(state, action);
        case actionTypes.TOGGLE_SHOW_HISTORY:
            return toggleShowHistory(state, action);
        case actionTypes.CHECK_HAS_STARED:
            return checkHasStartedPlaying(state, action);
        case actionTypes.EMPTY_EDITING_SLIP:
            return EmptyEditingIndexSlip(state, action);
        case actionTypes.INITIALIZE_BOARD:
            return initializeBoard(state, action);
        case actionTypes.ADD_EMPTY_SLIP:
            return addEmptySlip(state, action);
        case actionTypes.SET_EDITING_INDEX:
            return setEditIndex(state, action);
        case actionTypes.SET_ADDING:
            return setAdding(state, action);
        case actionTypes.SET_REMOVING:
            return setRemoving(state, action);
        case actionTypes.TOGGLE_SELECTED_TILE:
            return toggleSelectedTile(state, action);
        case actionTypes.COPY_BETSLIP:
            return copyBetslip(state, action);
        case actionTypes.REMOVE_ROW_FROM_BETSLIP:
            return removeRowFromBetSlip(state, action);
        case actionTypes.CHECK_PURCHASABLE:
            return checkPurchasable(state, action);
        case actionTypes.PURCHASE_ALL:
            return setPurchaseAll(state, action);
        case actionTypes.DELETE_AND_RESET_ALL:
            return deleteAndResetAll(state, action);
        case actionTypes.CALCULATE_SLIP_PRICE:
            return calulateGameAmount(state, action);
        case actionTypes.CALCULATE_GRAND_tOTAL:
            return calculateGrandTtoalPriceOfAllSlips(state, action);
        case actionTypes.GENERATE_SLIP:
            return generateSlip(state, action);
        case actionTypes.SET_SHOW_FUNDS:
            return setShowFunds(state, action);
            case actionTypes.CREDIT_FUNDS:
                return creditFunds(state, action);
            case actionTypes.DEBIT_FUNDS:
                return debitFunds(state, action);
            case actionTypes.SET_ISTOWALLET:
                return setIsToWallet(state, action);
        default:
            return state;
    }
}
export default reducer;