import React, {Component} from "react";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./Location";
import Weather from "./weather/Weather";


class Homepage extends  Component{
  render(){
    return (
      <div>
        <Header/>
        <Date/>
        <Location/>
        <Weather/>
        homepage
      </div>
    );
  }
}

export default Homepage;