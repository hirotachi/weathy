import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./locations/Location";
import Weather from "./weather/Weather";
import NetworkError from "./network/NetworkError";
import Background from "./Background/Background";

const Homepage = (props) => (
  <div className="homepage">
    {
      props.networkError ?
        <NetworkError/> :
        <React.Fragment>
          <Background/>
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