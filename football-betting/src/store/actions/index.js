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
     genrateSlip,
     toggleShowHistory,
     setIsPaying,
     setIsPaid,
     executePurchase,
     setReceipt,
     toggleIsShowReceipt,
     toggleShowFunds,
     setShowFunds,
     creditFunds,
     setIsToWallet,
     debitFunds,
     toggleReceiptShowHistory
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