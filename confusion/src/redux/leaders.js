import * as ActionTypes from "./ActionTypes"

export const Leaders = (state = {
    isLoading: true, errMsg: null, leaders: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errorMsg: null, leaders: action.payload}

        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errorMsg: null, leaders: []}

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errorMsg: action.payload, leaders: []}

        default:
            return state;
    }
}