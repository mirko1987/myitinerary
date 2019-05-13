import { GET_COMMENTS, COMMENTS_LOADING, ADD_COMMENT, DELETE_COMMENT } from "./types"
import { tokenConfig } from "./authActions"
import { returnErrors } from "./errorActions"
import axios from "axios"

export const getComments = (itineraryId) => dispatch => {
    dispatch(setCommentsLoading());
    axios
        .get(`/api/comments/${itineraryId}`)
        .then(res =>
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setCommentsLoading = () => {
    return {
        type: COMMENTS_LOADING
    }
}

export const addComment = (comment, itineraryId) => (dispatch, getState) => {
    axios
        .post(`/api/comments/${itineraryId}`, comment, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteComment = id => (dispatch, getState) => {
    axios
        .delete(`/api/comments/${id}`, tokenConfig(getState))
        .then(() => dispatch({
            type: DELETE_COMMENT,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}