import {combineReducers, compose, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import locationsReducer from "../reducers/locations";
import backgroundsReducer from "../reducers/backgrounds";
import searchReducer from "../reducers/search";
import weatherReducer from "../reducers/weather";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(combineReducers({
    locations: locationsReducer,
    backgrounds: backgroundsReducer,
    search: searchReducer,
    weather: weatherReducer
  }), composeEnhancers(applyMiddleware(thunk)));
}