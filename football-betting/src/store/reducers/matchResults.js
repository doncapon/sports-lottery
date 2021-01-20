import produce from 'immer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentResults: [],
}

const intializeResults=(state , action) =>{
    return produce(state, draft => {
        draft.currentResults.splice(draft.currentResults.length, 
            (draft.currentResults.length+1), action.payload);
    });
}



const reducer = (state = initialState , action)=>{
    switch (action.type) {
        case actionTypes.INITIALIZE_CURRENT_RESULT:
            return intializeResults(state, action);
            default:
            return state;
    }
}


export default reducer;



