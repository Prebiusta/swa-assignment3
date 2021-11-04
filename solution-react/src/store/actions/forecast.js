import * as actionTypes from "./actionTypes"
import {axiosClient} from "../../weatherReportAxios";

const fetchForecastStart = () => {
    return {
        type: actionTypes.FETCH_FORECAST_START,
    };
};

const fetchForecastSuccess = (forecast) => {
    return {
        type: actionTypes.FETCH_FORECAST_SUCCESS,
        data: forecast,
    };
};

const fetchForecastFailed = (error) => {
    return {
        type: actionTypes.FETCH_FORECAST_FAILED,
        error: error
    }
}

export const fetchForecast = () => {
    return (dispatch) => {
        dispatch(fetchForecastStart)
        axiosClient
            .get("/forecast")
            .then((response) => {
                dispatch(fetchForecastSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchForecastFailed(error))
            });
    };
};