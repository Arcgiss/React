import * as ActionTypes from "./ActionTypes";

export const Comments = (state = {
    errMsg: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMsg: null, comments: action.payload}

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, comments: []}

        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};