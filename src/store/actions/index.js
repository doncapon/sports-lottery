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
     setBoardLoading,
} from './board';

export {
     fetchPredictionsAll
} from './prediction';

export {
     setLoggedInUser,
     setIsLoggedIn,
     login,
     setForgot,
     logout,
     setFunds
} from './login';

export {
     setCurrentResult,
     fetchWeeklyResults,
     fetchResults,
     configureBoard,
     setEventDate
} from './config';

export {
     fetchBanks,
     resetSavedBanks
} from './banks';