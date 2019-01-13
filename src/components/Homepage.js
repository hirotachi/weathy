import React, {Component} from "react";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./locations/Location";
import Weather from "./weather/Weather";


class Homepage extends  Component{
  render(){
    return (
      <div>
        <Header/>
        {
          window.matchMedia("min-width: 480px").matches ?
            <React.Fragment>
              <Location/>
              <Date/>
            </React.Fragment> :
            <React.Fragment>
              <Date/>
              <Location/>
            </React.Fragment>
        }

        {console.log(window.matchMedia("(max-width: 480px)").matches)}

        <Weather/>
      </div>
    );
  }
}

export default Homepage;