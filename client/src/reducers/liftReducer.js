//Holds all the reducers for the action files

import { GET_LIFTS, ADD_LIFT, DELETE_WORKOUT, LIFTS_LOADING, GET_LIFT, UPDATE_LIFT } from '../actions/types';


const initialState = {
    lifts: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIFTS:
            return {
                ...state,
                lifts: action.payload,
                loading: false
            };
        case GET_LIFT:
            return {
                ...state,
                lifts: action.payload,
                loading: false
            };

        case UPDATE_LIFT:
            return {
                ...state,
                lifts: action.payload
            };
        case ADD_LIFT:
            return {
                ...state,
                lifts: [action.payload, ...state.lifts]
            };
        case LIFTS_LOADING:
            return {
                ...state,
                loading: true

            }
        default:
            return state;
    }
}