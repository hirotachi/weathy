import React, {Component} from "react";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./locations/Location";
import Weather from "./weather/Weather";
import CurrentLocation from "./locations/CurrentLocation";


class Homepage extends  Component{
  render(){
    return (
      <div>
        <Header/>
        <CurrentLocation/>
        <Date/>
        <Location/>
        <Weather/>
        homepage
      </div>
    );
  }
}

export default Homepage;