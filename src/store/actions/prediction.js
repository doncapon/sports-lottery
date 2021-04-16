import * as actionTypes from './actionTypes'
import axios   from '../../axios-fixtures';

export const fetchPredictions=(payLoad, gameIndex)=>{
    return {
        type: actionTypes.FETCH_PREDICTIONS_ALL,
        payLoad: payLoad,
        gameIndex : gameIndex,
    }
}


export const fetchPredictionsAll = (fixture, gameIndex)=>{
        return dispatch =>{
                axios.get("/predictions/"+ fixture)
            .then(response =>{
                dispatch(fetchPredictions(response.data.api.predictions,
                     gameIndex));
            }).catch(error =>{
    
            });
}
}