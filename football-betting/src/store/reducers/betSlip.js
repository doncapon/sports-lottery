import *  as actionTyppes from '../actions/actionTypes'; 


const initialStte = {

    betSlip : []
};

const reducer = (state = initialStte, action) => {
    switch(action.type){
        case actionTyppes.REMOVE_FROM_BETsSLIP:
            return state;
        default:
            return state;
    }
}



export default reducer;