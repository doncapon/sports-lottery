import * as  actionTypes from './actionTypes';



export const setUpWinners = (jackpot, thirteenPercent, twelvePercent, elevenPercent, tenPercent,
    thirteenPieces, twelvePieces, elevenPieces, tenPieces) => {
    return {
        type: actionTypes.SETUP_WINNERS,
        jackpot: jackpot,

        thirteenPercent: thirteenPercent,
        twelvePercent: twelvePercent,
        elevenPercent: elevenPercent,
        tenPercent: tenPercent,

        thirteenPieces: thirteenPieces,
        twelvePieces: twelvePieces,
        elevenPieces: elevenPieces,
        tenPieces: tenPieces
    };
}