import React from "react";
import { connect } from "react-redux";
import Weatherbar from "./WeatherBar";
import { Humidity, Rain, Wind } from "../icons/icons";

const Weather = ({ weather }) => (
  <div className="weather">
    <div className="weather__main">
      <p className="weather__main--temp">temprature: {Math.floor(weather.temperature)}&deg; C</p>
      <p className="weather__main--sum">{weather.summary}</p>
    </div>
    <div className="weather__secondary">
      <div className="weather__secondary--field">
        <Wind/>{weather.windSpeed} km/h <Weatherbar value={weather.windSpeed}/>
      </div>
      <div className="weather__secondary--field">
        <Rain/> rain: {Math.floor(weather.rain)}%
        <Weatherbar value={Math.floor(weather.rain)}/>
      </div>
      <div className="weather__secondary--field">
        <Humidity/> humidity: {Math.floor(weather.humidity * 100)}%
        <Weatherbar value={Math.floor(weather.humidity * 100)}/>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    weather: state.weather
  }
};
export default connect(mapStateToProps)(Weather);