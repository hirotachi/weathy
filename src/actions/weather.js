import {client} from "./search";
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
    }).then(({data}) => console.log(data))
    .catch(err => console.log(err))
  }
};

const getWeatherData = (lon, lat) => {

};
const setCurrentCityWeather = (weather) => {
  return {
    type: "SET_CURRENT_CITY_WEATHER",
    weather
  }
};