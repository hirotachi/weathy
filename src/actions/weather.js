import {client, setNetworkError} from "./search";
import gql from "graphql-tag";


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
    }).then(({data}) => dispatch(setCurrentCityWeather(data.currentWeather)))
    .catch(err => dispatch(setNetworkError()))
  }
};

const setCurrentCityWeather = (weather) => {
  return {
    type: "SET_CURRENT_CITY_WEATHER",
    weather
  }
};