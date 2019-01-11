import React, {Component} from "react";
import {connect} from "react-redux";



class Weather extends Component{
  render(){
    return(
      <div>weather data</div>
    );
  }
}

export default connect()(Weather);