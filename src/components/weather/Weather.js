import React from "react";
import {connect} from "react-redux";
import Weatherbar from "./WeatherBar";

const Weather = ({weather}) => (
  <div>
    ////////////////////////////
    <p>temprature: {weather.temperature}&deg; C</p>
    <div>summary: {weather.icon}</div>
    <div>wind: {weather.windSpeed} km/h <Weatherbar value={weather.windSpeed}/></div>
    <div>rain: {Math.floor(weather.rain * 100)}% <Weatherbar value={Math.floor(weather.rain * 100)}/></div>
    <div>humidity: {weather.humidity * 100}% <Weatherbar value={weather.humidity * 100}/></div>

    ///////////////////////////
  </div>
);

const mapStateToProps = (state) => {
  return {
    weather: state.weather
  }
};
export default connect(mapStateToProps)(Weather);