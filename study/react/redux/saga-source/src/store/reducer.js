import * as actionTypes from  './actionType';

const reducer = (state={number:1}, action) => {
    switch (action.type) {
        case actionTypes.ADD: {
            return { number: state.number+1}
        };
        case actionTypes.ASYNC_ADD: {
            return {number: state.number+2}
        }
        default:
            return state;
    }
}

export default reducer;
