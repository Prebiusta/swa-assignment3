import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../util";

const initialState = {
    data: [],
    dataLoading: false,
    error: null
}

const fetchWeatherDataStart = (state, _) => {
    return updateObject(state, {dataLoading: true, error: null})
}

const fetchWeatherDataSuccess = (state, action) => {
    return updateObject(state, {data: action.data, dataLoading: false, error: null})
}

const fetchWeatherDataFailed = (state, _) => {
    return updateObject(state, {dataLoading: false, error: null})
}

const weatherDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WEATHER_DATA_START:
            return fetchWeatherDataStart(state, action)
        case actionTypes.FETCH_WEATHER_DATA_SUCCESS:
            return fetchWeatherDataSuccess(state, action)
        case actionTypes.FETCH_WEATHER_DATA_FAILED:
            return fetchWeatherDataFailed(state, action)
        default:
            return state
    }
}

export default weatherDataReducer
