// import { GET_ITINERARIES, ITINERARIES_LOADING, ADD_ITINERARY, ADD_IT_SUCCESS, DELETE_ITINERARY, UPDATE_ITINERARY } from "./types"

import {
  GET_ITINERARIES,
  GET_ALL_ITINERARIES,
  ITINERARIES_LOADING,
  ADD_ITINERARY,
  ADD_IT_SUCCESS,
  DELETE_ITINERARY,
  UPDATE_ITINERARY,
  SET_ITINERARY_RATING,
  SET_ITINERARY_LIKES
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import apiURL from "../api_urls";

import axios from "axios";

// export const getItineraries = id => dispatch => {
//   dispatch(setItinerariesLoading());
//   axios
//     .get(`/api/itineraries/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_ITINERARIES,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

export const getItineraries = id => dispatch => {
  dispatch(setItinerariesLoading());
  axios.get(`${apiURL.itineraries}/${id}`).then(res =>
    dispatch({
      type: GET_ITINERARIES,
      payload: res.data
    })
  );
};

export const setItinerariesLoading = () => {
  return {
    type: ITINERARIES_LOADING
  };
};

export const addItinerary = (itinerary, cityId) => (dispatch, getState) => {
  axios
    .post(`/api/itineraries/${cityId}`, itinerary, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITINERARY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItSuccess = () => {
  return {
    type: ADD_IT_SUCCESS
  };
};

export const deleteItinerary = itineraryId => (dispatch, getState) => {
  axios
    .delete(`/api/itineraries/${itineraryId}`, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: DELETE_ITINERARY,
        payload: itineraryId
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateItinerary = (itinerary, itineraryId) => dispatch => {
  axios
    .put(`/api/itineraries/${itineraryId}`, itinerary)
    .then(() =>
      dispatch({
        type: UPDATE_ITINERARY,
        payload: itinerary
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItineraryRating = (rating, itineraryId) => (
  dispatch,
  getState
) => {
  const newRating = {
    itineraryId,
    rating
  };
  axios
    .put(
      `${apiURL.itineraries}/${itineraryId}/rating`,
      newRating,
      tokenConfig(getState)
    )
    .then(() =>
      dispatch({
        type: SET_ITINERARY_RATING,
        payload: newRating
      })
    );
};

export const setItineraryLikes = (likes, itineraryId) => (
  dispatch,
  getState
) => {
  const newLikes = {
    itineraryId,
    likes
  };
  axios
    .put(
      `${apiURL.itineraries}/${itineraryId}/likes`,
      newLikes,
      tokenConfig(getState)
    )
    .then(() =>
      dispatch({
        type: SET_ITINERARY_LIKES,
        payload: newLikes
      })
    );
};
