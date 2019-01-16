import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./locations/Location";
import Weather from "./weather/Weather";
import NetworkError from "./network/NetworkError";
import GifSlider from "./gifSlider/GifSlider";


const Homepage = (props) => (
  <div className="homepage">
    <GifSlider/>
    {
      props.networkError ?
        <NetworkError/> :
        <React.Fragment>
          <Header router={props}/>
          <div className="header__sub">
            <Date/>
            <Location/>
          </div>
          <Weather/>
        </React.Fragment>
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    networkError: state.search.networkError
  }
};
export default connect(mapStateToProps)(Homepage);