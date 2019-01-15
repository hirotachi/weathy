import React, {PureComponent} from "react";
import {connect} from "react-redux";
import shortid from "shortid";
import {setSelectedLocation} from "../../actions/locations";
import {getCurrentCityWeather} from "../../actions/weather";
import CurrentLocation from "./CurrentLocation";


class Location extends PureComponent {

  state = {
    currentIndex: 0,
    currentNum: 22.5,
    firstTouch: 0
  };

  // lifecycle =================================================

  componentDidMount() {
    this.setInitialPos();
    window.addEventListener("resize", this.setInitialPos);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.locations.length !== prevProps.locations.length) {
      this.moveToLastLocation();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.setInitialPos);
  };

  // new data handler =================================================

  moveToLastLocation = () => { // move to last location that was added to the locations list
    const mainNum = 55;
    const calcMoveBy = mainNum * (this.props.locations.length - 1) - 22.5;
    this.setState(() => ({
      currentIndex: this.props.locations.length - 1,
      currentNum: -calcMoveBy
    }));
  };

  // click handlers =================================================
  setInitialPos = () => {
    // set initial slider location dynamically dependent on css value
    const locationCity = document.querySelector(".locations__city");
    const locationsList = document.querySelector(".locations");
    const mainNum = Math.round(locationCity.offsetWidth / locationsList.offsetWidth * 100);
    if(this.state.currentIndex === 0){
      this.setState(() => ({currentNum: (100 - mainNum) / 2}));
    }
  };
  handleLocationChange = (index) => { // change translate3d upon selected location change
    const {currentIndex, currentNum} = this.state;
    const locationCity = document.querySelector(".locations__city");
    const locationsList = document.querySelector(".locations");
    //calculate the value the slider will move by (dynamic value dependent on css value)
    const mainNum = Math.round(locationCity.offsetWidth / locationsList.offsetWidth * 100);
    if (currentIndex < index) {
      this.setState(() => ({currentNum: currentNum - mainNum}));
    } else if (currentIndex > index) {
      this.setState(() => ({currentNum: currentNum + mainNum}));
    }
  };

  handleSelectedLocation = (location, index) => { // set selected location by id
    const {id, geometry} = location;
    this.props.dispatch(setSelectedLocation(id));
    this.props.dispatch(getCurrentCityWeather(geometry));
    this.setState(() => ({currentIndex: index}));
    this.handleLocationChange(index);
  };
  // touch handlers =================================================
  handleTouchStart = (e) => {
    const firstTouch = e.changedTouches[0].clientX;
    this.setState(() => ({firstTouch}));
  };
  handleTouchEnd = (e) => {
    const {firstTouch, currentIndex} = this.state;
    const {locations} = this.props;
    const currentTouch = e.changedTouches[0].clientX;
    if (firstTouch > currentTouch) {
      if (locations[currentIndex + 1]) {
        this.handleSelectedLocation(locations[currentIndex + 1], currentIndex + 1)
      }
    } else if (firstTouch < currentTouch) {
      if (locations[currentIndex - 1]) {
        this.handleSelectedLocation(locations[currentIndex - 1], currentIndex - 1)
      }
    }
  };

  render() {
    return (
      <div className="locations"
           onTouchStart={this.handleTouchStart}
           onTouchEnd={this.handleTouchEnd}
      >
        <div className="locations__container"
             style={{transform: `translate3d(${this.state.currentNum}%, 0, 0)`}}
        >
          {
            this.props.locations.length > 0 &&
            this.props.locations.map((location, index) =>
              <div
                className={`locations__city ${this.state.currentIndex === index ? "active-city" : ""}`}
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