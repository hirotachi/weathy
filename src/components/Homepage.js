import React, {Component} from "react";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./Location";


class Homepage extends  Component{
  render(){
    return (
      <div>
        <Header/>
        <Date/>
        <Location/>
        homepage
      </div>
    );
  }
}

export default Homepage;