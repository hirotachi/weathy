import React, {Component} from "react";
import {connect} from "react-redux";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./locations/Location";
import Weather from "./weather/Weather";
import NetworkError from "./network/NetworkError";


class Homepage extends  Component{
  state = {
    mobile: false
  };

  componentDidMount() {
    window.addEventListener("resize", this.checkMedia);
    this.checkMedia();
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.checkMedia);
  };


  checkMedia = () => { // change state when window is resized
    const mobile = window.matchMedia("(max-width: 480px)").matches;
    this.setState(() => ({mobile}));
  };

  render(){
    return (
      <div>
        {
          this.props.networkError ?
              <NetworkError/>:
          <React.Fragment>
            <Header router={this.props}/>
            {
              this.state.mobile ?
                  <React.Fragment>
                    <Location/>
                    <Date/>
                  </React.Fragment> :
                  <React.Fragment>
                    <Date/>
                    <Location/>
                  </React.Fragment>
            }
            <Weather/>
          </React.Fragment>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    networkError: state.search.networkError
  }
};
export default connect(mapStateToProps)(Homepage);