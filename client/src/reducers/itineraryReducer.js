import { GET_ITINERARIES, ITINERARIES_LOADING, ADD_ITINERARY, ADD_IT_SUCCESS, DELETE_ITINERARY, UPDATE_ITINERARY } from "../actions/types"

const initialState = {
    itineraries: [],
    loading: false,
    additsuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITINERARIES:
            return {
                ...state,
                itineraries: action.payload,
                loading: false
            }
        case ITINERARIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_ITINERARY:
            return {
                ...state,
                itineraries: [action.payload, ...state.itineraries],
                additsuccess: true
            }
        case ADD_IT_SUCCESS:
            return {
                ...state,
                additsuccess: false
            }
        case DELETE_ITINERARY:
            return {
                ...state,
                itineraries: state.itineraries.filter(itinerary => itinerary._id !== action.payload),
                additsuccess: true
            }
        case UPDATE_ITINERARY:
            return {
                ...state,
                itineraries: state.itineraries.map(itinerary => itinerary._id === action.payload._id ? action.payload : itinerary),
                additsuccess: true
            }
        default:
            return state
    }
}

