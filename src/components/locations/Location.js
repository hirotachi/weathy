import React, { Component } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { setSelectedLocation } from "../../actions/locations";
import { getCurrentCityWeather } from "../../actions/weather";
import CurrentLocation from "./CurrentLocation";
import { Arrow } from "../icons/icons";


class Location extends Component {
  state = {
    firstTouch: 0
  };

  // lifecycle =================================================

  componentDidMount() {
    this.setInitialPos();
    window.addEventListener("touchstart", this.handleTouchStart);
    window.addEventListener("touchend", this.handleTouchEnd);
    window.addEventListener("resize", this.setInitialPos);
    window.addEventListener("wheel", this.handleScroll);
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.locations.length !== this.props.locations.length;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.locations.length !== prevProps.locations.length) {
      this.moveToLastLocation(this.props.locations.length - 1);
    }
  };

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.handleTouchStart);
    window.removeEventListener("touchend", this.handleTouchEnd);
    window.removeEventListener("resize", this.setInitialPos);
    window.removeEventListener("wheel", this.handleScroll);
    clearTimeout(this.restoreScrollEventhandler);
  };

  // new data handler =================================================

  moveToLastLocation = () => { // move to last location that was added to the locations list
    const index = this.props.locations.length - 1;
    this.moveLocationSlider(index);
  };

  // click handlers =================================================
  setInitialPos = () => {
    // set initial slider location dynamically dependent on css value
    const index = this.getCurrentActiveIndex();
    this.moveLocationSlider(index);
  };

  handleSelectedLocation = (location, index) => { // set selected location by id
    const { id, geometry } = location;
    this.props.dispatch(setSelectedLocation(id));
    this.props.dispatch(getCurrentCityWeather(geometry));
    this.moveLocationSlider(index);
  };
  // style handlers =================================================
  moveLocationSlider = (index) => { // move slider depending on the index provided
    const slider = document.querySelector(".locations__container");
    const locationCity = document.querySelector(".locations__city");
    const locationsList = document.querySelector(".locations");
    const mainNum = Math.round(locationCity.offsetWidth / locationsList.offsetWidth * 100);
    const initialNum = (100 - mainNum) / 2;
    const num = initialNum - (mainNum * index);
    const moveBy = `translate3d(${num}%, 0, 0)`;
    this.repositionClass(index);
    slider.style.transform = moveBy.toString();
    this.styleNavArrows();
  };
  repositionClass = (index) => { // reposition active-city class for styling
    const locations = document.getElementsByClassName("locations__city");
    for (let i = 0; i < locations.length; i++) {
      if (i === index) {
        locations[i].classList.add("active-city");
      } else {
        locations[i].classList.remove("active-city");
      }
    }
  };
  getCurrentActiveIndex = () => { // get current active location on slider
    const locations = document.getElementsByClassName("locations__city");
    let index = 0;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].classList.contains("active-city")) {
        index = i;
        break;
      }
    }
    return index;
  };

  styleNavArrows = () => { // style nav arrows according to current index
    const index = this.getCurrentActiveIndex();
    const {locations} = this.props;
    const arrowLeft = document.querySelector(".left");
    const arrowRight = document.querySelector(".right");
    if(locations.length - 1 === index){
      arrowRight.style.opacity = 0.3;
      arrowLeft.removeAttribute("style");
    }else if (index === 0){
      arrowLeft.style.opacity = 0.3;
      arrowRight.removeAttribute("style");
    }else {
      arrowLeft.removeAttribute("style");
      arrowRight.removeAttribute("style");
    }
  };
  // touch handlers =================================================
  handleTouchStart = (e) => {
    const firstTouch = e.changedTouches[0].clientX;
    this.setState(() => ({ firstTouch }));
  };
  handleTouchEnd = (e) => { // change location by touch on mobile devices
    const { firstTouch } = this.state;
    const currentTouch = e.changedTouches[0].clientX;
    if(currentTouch > firstTouch + 50){
      this.handleDirection("next");
    }else if (currentTouch < firstTouch - 50) {
      this.handleDirection("previous");
    }
  };
  // direction handler================================================
  handleDirection = (command) => { // calls slider to move in desired direction
    const { locations } = this.props;
    let index = this.getCurrentActiveIndex();
    if(command === "next"){
      if(locations[index - 1]){
        this.handleSelectedLocation(locations[index - 1], index - 1);
      }
    }else if ("previous"){
      if(locations[index + 1]){
        this.handleSelectedLocation(locations[index + 1], index + 1);
      }
    }
  };
  //scroll hander======================================================
  handleScroll = (e) => { // handle scroll on slider
    if(e.deltaY > 0){
      this.handleDirection("previous");
    }else if (e.deltaY < 0){
      this.handleDirection("next");
    }
    window.removeEventListener("wheel", this.handleScroll);
    this.restoreScrollEventhandler = setTimeout(() => { // pause the scrolling for performance
      window.addEventListener("wheel", this.handleScroll);
    }, 500);
  };
  render() {
    return (
      <div className="locations">
        <div className="locations__nav">
          <span className="left" onClick={() => this.handleDirection("next")}>
            <Arrow style="locations__nav--arrow"/>
          </span>
          <span className="right" onClick={() => this.handleDirection("previous")}>
            <Arrow style="locations__nav--arrow"/>
          </span>
        </div>
        <div className="locations__container">
          {
            this.props.locations.length > 0 &&
            this.props.locations.map((location, index) =>
              <div
                className={`locations__city ${0 === index ? "active-city" : ""}`}
                key={shortid()}
                onClick={() => this.handleSelectedLocation(location, index)}
              >
                {!!location.city ?
                  <span className="locations__city--name">{
                    location.city.length > 12 ?
                      location.city.split(" ")[0] :
                      location.city
                  }
                    </span> :
                  <span className="location__city--state">{location.state}</span>
                }
              </div>)
          }
        </div>
        <CurrentLocation/>
      </div>
    );
  }
}

const
  mapStateToProps = (state) => {
    return {
      locations: state.locations.locationsList
    }
  };
export default connect(mapStateToProps)

(
  Location
)
;