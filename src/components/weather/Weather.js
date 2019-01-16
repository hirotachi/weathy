import React from "react";
import {connect} from "react-redux";
import Weatherbar from "./WeatherBar";
import {Humidity, Rain, Wind} from "../icons/icons";

const Weather = ({weather}) => (
  <div>
    <p>temprature: {Math.floor(weather.temperature)}&deg; C</p>
    <div>summary: {weather.summary}</div>
    <div><Wind/> wind: {weather.windSpeed} km/h <Weatherbar value={weather.windSpeed}/></div>
    <div><Rain/> rain: {Math.floor(weather.rain)}% <Weatherbar value={Math.floor(weather.rain)}/></div>
    <div><Humidity/> humidity: {Math.floor(weather.humidity * 100)}% <Weatherbar value={Math.floor(weather.humidity * 100)}/></div>

  </div>
);

const mapStateToProps = (state) => {
  return {
    weather: state.weather
  }
};
export default connect(mapStateToProps)(Weather);