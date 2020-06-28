import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment

});

export const fetchLeaders = () => dispatch => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + "leaders")
        .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    let error = new Error("Error" + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errorMsg = new Error(error.message);
                throw  errorMsg;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export  const postFeedback = (feedback) => dispatch => {
    return fetch(baseUrl + "feedback", {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    let error = new Error("Error" + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errorMsg = new Error(error.message);
                throw  errorMsg;
            })
        .then(response => response.json())
        .then(response => { alert("Thank you for your feedback!\n" + JSON.stringify(response))})
        .catch(error => { console.log("Post comments", error.message); alert("Your message could not be posted\nError: " + error.message);})
}

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + "comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    let error = new Error("Error" + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errorMsg = new Error(error.message);
                throw  errorMsg;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log("Post comments", error.message); alert("Your message could not be posted\nError: " + error.message);})
};

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + "dishes")
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error("Error" + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                let errorMsg = new Error(error.message);
                throw  errorMsg;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errormsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errormsg
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


export const dishesLoading = () => ({
   type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errormsg) => ({
   type: ActionTypes.DISHES_FAILED,
   payload: errormsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + "comments")
        .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    let error = new Error("Error" + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errorMsg = new Error(error.message);
                throw  errorMsg;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errormsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errormsg
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + "promotions")
        .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    let error = new Error("Error" + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errorMsg = new Error(error.message);
                throw  errorMsg;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errormsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errormsg
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});