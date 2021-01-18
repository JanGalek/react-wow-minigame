import {ADD_ARTICLE} from "../constants/action-types";


const initialState = {
    data: []
}

function rootReducer(state = initialState, action: { type: string; payload: any; }) {
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, { data: state.data.concat(action.payload) });
    }
    return state
}

export default rootReducer;
