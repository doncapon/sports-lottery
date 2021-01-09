import produce from 'immer';
import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialStte = {
    predictions : [],
    loading: false
}

const fetchPredictionsAll = (state, action) =>{
    return produce (state, draft =>{
        let newPredition = {gameIndex: action.gameIndex}
            newPredition.prediction = _.cloneDeep(action.payLoad);
            newPredition.isLoaded = true;

            if(draft.predictions.length <= 0 || draft.predictions === null){
                draft.predictions = Object.assign([], [newPredition]);
            }
            else{
                draft.predictions.push( newPredition)
            }

    });
}

const reducer = (state = initialStte, action) =>{
    switch(action.type) {
        case actionTypes.FETCH_PREDICTIONS_ALL:
            return fetchPredictionsAll(state, action);
        default: 
        return state;
    }
}

export default reducer;