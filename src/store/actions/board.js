import * as actionTypes from './actionTypes';
import firebase from '../../config/firebase/firebase';

export const setVersion = (version) => {
    return {
        type: actionTypes.SET_VERSION,
        version: version
    }
}

export const setIsConfiguring = (isConfigure) => {
    return {
        type: actionTypes.SET_IS_CONFIGURING,
        isConfiguring: isConfigure
    }
}

export const generateSlip = (amount, slipIndex, basePrice) => {
    return dispatch => {
        dispatch(EmptyEditingISlip2());
        dispatch(generateSlip2(amount, basePrice));
        dispatch(setPurchaseAll());
        dispatch(calculateSpecificSlipPrice(slipIndex, basePrice));
        dispatch(calculateGrandTtoalPriceOfAllSlips());

    }
}


export const generateSlip2 = (amount, basePrice) => {
    return {
        type: actionTypes.GENERATE_SLIP,
        amount: amount,
        basePrice: basePrice,
    }
}

export const setBoard = (basePrice) => {
    return dispatch => {
        firebase.database().ref("board").orderByChild("dateKey").limitToLast(1)
            .once("value").then(snapshot => {
                let returned = Object.assign([], snapshot.val());
                let wantedFixtures = [];
                Object.keys(returned).map(key => {
                    let fixt = returned[key];
                    Object.keys(fixt).map(key2 => {
                        if (key2 !== "isPaid" && key2 !== "dateKey" && key2 !== "postponed" && key2 !== "evaluationTime")
                            wantedFixtures.push(fixt[key2]);
                        return null;
                    });
                    if (wantedFixtures.length === 13){
                        dispatch(initializeBoard(wantedFixtures, basePrice));
                    }
                    return null;
                })
            });
    };
}
export const setFixtureIds = () => {
    return {
        type: actionTypes.SET_FIXTURE_IDS

    }
}
export const setIsToWallet = (isToWallet) => {
    return {
        type: actionTypes.SET_ISTOWALLET,
        isToWallet: isToWallet,

    }
}

export const resetReduxBoard = () => {
    return {
        type: actionTypes.RESET_BOARD
    }
}
export const toggleShowFunds = () => {
    return {
        type: actionTypes.TOGGLE_SHOWFUNDS,
    }
}

export const setShowFunds = (show) => {
    return {
        type: actionTypes.SET_SHOW_FUNDS,
        show: show
    }
}

export const toggleIsShowReceipt = () => {
    return {
        type: actionTypes.TOGGLE_SHOW_RECEIPT,
    }
}

const setReceipt2 = (gameDay, endTime, gameDate) => {
    return {
        type: actionTypes.SET_RECEIPT,
        gameDay: gameDay,
        endTime: endTime,
        gameDate: gameDate
    }
}

export const setReceipt = (gameDay) => {
    return dispatch => {
        firebase.database().ref("board").limitToLast(2).once("value").then(snapshot => {
            let gameDate = Object.keys(snapshot.val())[1];
            let endTime = snapshot.val()[gameDate].evaluationTime;
            dispatch(setReceipt2(gameDay, endTime, gameDate))
        })
    }

}

export const toggleReceiptShowHistory = (receiptIndex) => {
    return {
        type: actionTypes.TOGGLE_SHOW_RECEIPT_HISTORY,
        receiptIndex: receiptIndex
    }
}


export const toggleShowHistory = (gameIndex) => {
    return {
        type: actionTypes.TOGGLE_SHOW_HISTORY,
        gameIndex: gameIndex
    }
}

export const setPurchaseAll = () => {
    return {
        type: actionTypes.PURCHASE_ALL
    }
}

export const setIsPaying = (isPaying) => {
    return {
        type: actionTypes.SET_ISPAYING,
        isPaying: isPaying
    }
}
export const setIsPaid = (isPaid) => {
    return {
        type: actionTypes.SET_ISPAID,
        isPaid: isPaid
    }
}


export const checkPurchasable = (index) => {
    return {
        type: actionTypes.CHECK_PURCHASABLE,
        slipIndex: index
    }
}
const EmptyEditingISlip2 = () => {
    return dispatch => {
        dispatch(EmptyEditingIndexSlip());
    }
}
export const EmptyEditingISlip = () => {
    return dispatch => {
        dispatch(EmptyEditingIndexSlip());
        dispatch(setPurchaseAll());
        dispatch(calculateGrandTtoalPriceOfAllSlips());
    }
}
export const toggleSelectedTile = (slipIndex, gameIndex, sideIndex, side) => {
    return dispatch => {
        dispatch(toggleSelectedTile2(slipIndex, gameIndex, sideIndex, side));
        dispatch(checkHasStartedPlaying());
    }
}
export const toggleSelectedTile2 = (slipIndex, gameIndex, sideIndex, side) => {
    return {
        type: actionTypes.TOGGLE_SELECTED_TILE,
        slipIndex: slipIndex,
        gameIndex: gameIndex,
        sideIndex: sideIndex,
        side: side
    };
}


export const checkHasStartedPlaying = () => {
    return {
        type: actionTypes.CHECK_HAS_STARED
    }
}

export const EmptyEditingIndexSlip = () => {
    return {
        type: actionTypes.EMPTY_EDITING_SLIP
    }
}
export const calculateOverAllPrice = (slipIndex, gameIndex, sideIndex, basePrice) => {
    return dispatch => {
        dispatch(calulateGameAmount(slipIndex, gameIndex, sideIndex));
        dispatch(calculateSpecificSlipPrice(slipIndex, basePrice))
        dispatch(calculateGrandTtoalPriceOfAllSlips());
    }
}

export const initializeBoard = (fixtures, basePrice) => {
    return {
        type: actionTypes.INITIALIZE_BOARD,
        fixtures: fixtures,
        basePrice: basePrice
    };
}

export const addEmptySlip = (basePrice) => {
    return {
        type: actionTypes.ADD_EMPTY_SLIP,
        basePrice: basePrice
    };
}

export const calculateSpecificSlipPrice = (slipIndex, basePrice) => {
    return {
        type: actionTypes.CALCULATE_EDIT_INDEX_PRICE,
        slipIndex: slipIndex,
        basePrice: basePrice
    };
}


export const calulateGameAmount = (slipIndex, gameIndex, sideIndex) => {
    return {
        type: actionTypes.CALCULATE_SLIP_PRICE,
        slipIndex: slipIndex,
        gameIndex: gameIndex,
        sideIndex: sideIndex

    };
}


export const calculateGrandTtoalPriceOfAllSlips = () => {
    return {
        type: actionTypes.CALCULATE_GRAND_tOTAL,

    };
}
export const setBoardLoading = (loading) => {
    return {
        type: actionTypes.SET_BOARD_LOADING,
        loading: loading
    }
}

export const setEditIndex = (index) => {
    return {
        type: actionTypes.SET_EDITING_INDEX,
        position: index
    }
}

export const setAdding = (slipIndex, isAdded) => {
    return {
        type: actionTypes.SET_ADDING,
        slipIndex: slipIndex,
        isAdded: isAdded
    }
}

export const setRemoving = (slipIndex, isRemoved) => {
    return {
        type: actionTypes.SET_REMOVING,
        slipIndex: slipIndex - 1,
        removing: isRemoved
    }
}


export const deleteAndResetAll = () => {
    return {
        type: actionTypes.DELETE_AND_RESET_ALL
    }
}



export const copyBetslip = (position) => {
    return {
        type: actionTypes.COPY_BETSLIP,
        position: position
    };
}


export const removeRowFromBetSlip = (deleteId) => {
    return dispatch => {
        dispatch(removeRowFromBetSlip2(deleteId));
        dispatch(calculateGrandTtoalPriceOfAllSlips());
    };
}

export const removeRowFromBetSlip2 = (deleteId) => {
    return {
        type: actionTypes.REMOVE_ROW_FROM_BETSLIP,
        deleteId: deleteId
    };
}
