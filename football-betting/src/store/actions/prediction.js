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
                axios.get("/predictions/"+ fixture
             ,
            {
                headers: {
                    'x-rapidapi-key': '8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                  }
            })
            .then(response =>{
                dispatch(fetchPredictions(response.data.api.predictions,
                     gameIndex));
            }).catch(error =>{
    
            });
}
}