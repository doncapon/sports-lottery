import * as actionTypes from './actionTypes'
import axios from '../../axios-fixtures';

export const fetchPredictions = (payLoad, gameIndex) => {
    return {
        type: actionTypes.FETCH_PREDICTIONS_ALL,
        payLoad: payLoad,
        gameIndex: gameIndex,
    }
}


export const fetchPredictionsAll = (fixture, gameIndex) => {
    return dispatch => {
        axios.get("/predictions/" , {params: {fixture: fixture}})
            .then(response => {
                console.log(response.data.response)
                console.log("I am here");
                dispatch(fetchPredictions(response.data.response,
                    gameIndex));
            }).catch(error => {

            });
    }
}