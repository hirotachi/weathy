import React, {Component} from "react";
import Header from "./header/Header";
import Date from "./Date";
import Location from "./locations/Location";
import Weather from "./weather/Weather";


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
        <Header/>
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
      </div>
    );
  }
}

export default Homepage;