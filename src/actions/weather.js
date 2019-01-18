import {client, setNetworkError} from "./search";
import gql from "graphql-tag";
import { getCurrentBg } from "./backgrounds";


export const getCurrentCityWeather = ({lon, lat}) => { // get api weather info and fill required vars
  return (dispatch) => {
    client.query({
      query: gql`
          {
              currentWeather(lat: "${lat}", lon: "${lon}"){
                  temperature
                  rain
                  windSpeed
                  summary
                  humidity
                  icon
              }
          }
      `
    }).then(({data}) => {
      const {currentWeather} = data;
      const {icon} = currentWeather;
      dispatch(getCurrentBg(icon)); // gets the current background
      dispatch(setCurrentCityWeather(data.currentWeather))
    })
    .catch(err => dispatch(setNetworkError()))
  }
};

export const setCurrentCityWeather = (weather) => {
  return {
    type: "SET_CURRENT_CITY_WEATHER",
    weather
  }
};