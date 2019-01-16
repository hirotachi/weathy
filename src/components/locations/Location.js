import React, { Component } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { setSelectedLocation } from "../../actions/locations";
import { getCurrentCityWeather } from "../../actions/weather";
import CurrentLocation from "./CurrentLocation";


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
  // touch handlers =================================================
  handleTouchStart = (e) => {
    const firstTouch = e.changedTouches[0].clientX;
    this.setState(() => ({ firstTouch }));
  };
  handleTouchEnd = (e) => { // change location by touch on mobile devices
    const { firstTouch } = this.state;
    const { locations } = this.props;
    const currentTouch = e.changedTouches[0].clientX;
    let index = this.getCurrentActiveIndex();
    if(currentTouch > firstTouch){
      if(locations[index - 1]){
        this.handleSelectedLocation(locations[index - 1], index - 1);
      }
    }else if (currentTouch < firstTouch) {
      if(locations[index + 1]){
        this.handleSelectedLocation(locations[index + 1], index + 1);
      }
    }
  };

  render() {
    return (
      <div className="locations">
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