import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import forecastReducer from "./store/reducer/forecast";
import weatherDataReducer from "./store/reducer/weatherData";


const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose

const rootReducer = combineReducers({
    forecast: forecastReducer,
    weatherData: weatherDataReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
