export {
     setBoard,
     resetReduxBoard,
     toggleSelectedTile,
     copyBetslip,
     removeRowFromBetSlip,
     checkPurchasable,
     setAdding,
     setEditIndex,
     setPurchaseAll,
     setRemoving,
     deleteAndResetAll,
     calculateOverAllPrice,
     calculateGrandTtoalPriceOfAllSlips,
     addEmptySlip,
     EmptyEditingISlip,
     generateSlip,
     toggleShowHistory,
     setIsPaying,
     setIsPaid,
     setReceipt,
     toggleIsShowReceipt,
     toggleShowFunds,
     setShowFunds,
     setIsToWallet,
     toggleReceiptShowHistory,
     setBoardLoading
} from './board';

export {
     fetchPredictionsAll
} from './prediction';


export {
     setUpWinners
} from './matchResults';


export {
     setLoggedInUser,
     setIsLoggedIn,
} from './login';


export {
     setCurrentResult,
     fetchWeeklyResults,
     fetchResults
} from './config';


export {
     fetchBanks,
     resetSavedBanks
} from './banks';