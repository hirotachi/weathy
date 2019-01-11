import axios from "axios";

const apiKey = process.env.WEATHER_KEY;
export const getCurrentCityWeather = ({name, countryAbbr}) => { // get api weather info and fill required vars
  return (dispatch) => {
    const request = `https://api.openweathermap.org/data/2.5/weather?q=${name},${countryAbbr}&apikey=${apiKey}&units=metric`;
    axios.get(request).then(({data}) => {

      const {weather, main, sys, wind, rain} = data;

      const {
        id: code,
        description: weatherDescription,
      } = weather[0];

      let {
        humidity,
        temp: temperature
      } = main;

      const {sunrise, sunset} = sys;
      let {speed: windSpeed} = wind;

      dispatch(setCurrentCityWeather({
        weatherDescription,
        code,
        humidity,
        temperature,
        sunrise,
        sunset,
        windSpeed,
        rain
      }));
    })
      .catch(err => console.log(err));
  }
};


const setCurrentCityWeather = (weather) => {
  return {
    type: "SET_CURRENT_CITY_WEATHER",
    weather
  }
};