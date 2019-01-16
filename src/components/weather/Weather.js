import React from "react";
import { connect } from "react-redux";
import Weatherbar from "./WeatherBar";
import { Humidity, Rain, Wind } from "../icons/icons";

const Weather = ({ weather }) => (
  <div className="weather">
    <div className="weather__main">
      <p className="weather__main--temp">{Math.floor(weather.temperature)}&deg;</p>
      <p className="weather__main--sum">{weather.summary}</p>
    </div>
    <div className="weather__secondary">
      <div className="weather__secondary--field">
        {/*<Wind/>*/}
        <span className="field-title">wind</span>
        <span className="field-num">{Math.floor(weather.windSpeed)}</span>
        <span className="field-symbol">km/h</span>
        <Weatherbar value={weather.windSpeed}/>
      </div>
      <div className="weather__secondary--field">
        {/*<Rain/>*/}
        <span className="field-title">rain</span>
        <span className="field-num">{Math.floor(weather.rain * 100)}</span>
        <span className="field-symbol">%</span>
        <Weatherbar value={Math.floor(weather.rain * 100)}/>
      </div>
      <div className="weather__secondary--field">
        {/*<Humidity/>*/}
        <span className="field-title">humidity</span>
        <span className="field-num">{Math.floor(weather.humidity * 100)}</span>
        <span className="field-symbol">%</span>
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