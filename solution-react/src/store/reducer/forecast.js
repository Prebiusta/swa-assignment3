import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../util";

const initialState = {
    forecast: [],
    forecastLoading: false,
    error: null
}

const fetchForecastStart = (state, _) => {
    return updateObject(state, {forecastLoading: true, error: null})
}

const fetchForecastSuccess = (state, action) => {
    return updateObject(state, {forecast: action.data, forecastLoading: false, error: null})
}

const fetchForecastFailed = (state, _) => {
    return updateObject(state, {forecastLoading: false, error: null})
}

const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FORECAST_START:
            return fetchForecastStart(state, action)
        case actionTypes.FETCH_FORECAST_SUCCESS:
            return fetchForecastSuccess(state, action)
        case actionTypes.FETCH_FORECAST_FAILED:
            return fetchForecastFailed(state, action)
        default:
            return state
    }
}

export default forecastReducer
