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
     calculateSpecificSlipPrice,
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
     debitFunds
} from './board';

export {
     fetchPredictionsAll
} from './prediction';



export {
     setCurrentResult,
     setUpWinners
} from './matchResults';


export {
     login,
     setPassword,
     setUsername,
     setIsLoggedIn,
} from './login';