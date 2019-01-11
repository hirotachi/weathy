import axios from "axios";
import {client} from "./search";
import gql from "graphql-tag";




const openApiKey = process.env.OPEN_WEATHER_KEY;
const darkApiKey = process.env.DARK_SKY_KEY;

export const getCurrentCityWeather = ({name, countryAbbr}) => { // get api weather info and fill required vars
  return (dispatch) => {
    const request = `https://api.openweathermap.org/data/2.5/weather?q=${name},${countryAbbr}&apikey=${openApiKey}&units=metric`;
    axios.get(request)
      .then(({data}) => {
        const {coord} = data;
        const {lon, lat} = coord;
        getWeatherData(lon, lat)
      })
      .catch(err => console.log(err))
  }
};

const getWeatherData = (lon, lat) => {
  client.query({
    query: gql`
    {
      weather(lat: "${lat}", lon: "${lon}")
    }
    `
  }).then(({data}) => console.log(JSON.parse(data.weather)))
    .catch(err => console.log(err))
};
const setCurrentCityWeather = (weather) => {
  return {
    type: "SET_CURRENT_CITY_WEATHER",
    weather
  }
};