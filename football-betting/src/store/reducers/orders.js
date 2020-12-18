import *  as actionTyppes from '../actions/actionTypes'; 

const initialStte = {
    order : []
};

const reducer = (state = initialStte, action) =>{
    switch(action.type ){
        case actionTyppes.ADD_TO_BETsSLIP:
            return state;
        default:
            return state;
    }
}



export default reducer;