import React, {Component} from "react";
import {connect} from "react-redux";
import shortid from "shortid";
import {setSelectedLocation} from "../../actions/locations";
import {getCurrentCityWeather} from "../../actions/weather";


class Location extends Component {

  handleSelectedLocation = (location) => { // set selected location by id
    const {id, geomatry} = location;
    this.props.dispatch(setSelectedLocation(id));
    this.props.dispatch(getCurrentCityWeather(geomatry));
  };

  render() {
    return (
      <div>
        {
          this.props.locations.length > 0 &&
          this.props.locations.map(location =>
            <div key={shortid()} onClick={() => this.handleSelectedLocation(location)}>
              <span>city: {location.city}</span>
              <span>country: {location.country}</span>
            </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations.locationsList
  }
};
export default connect(mapStateToProps)(Location);