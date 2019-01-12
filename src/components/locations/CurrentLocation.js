import React, {Component} from "react";
import {connect} from "react-redux";
import selectLocation from "../../selectors/selectLocation";
import {setSelectedLocation} from "../../actions/locations";
import {getCurrentCityWeather} from "../../actions/weather";


class CurrentLocation extends Component {

  componentDidMount() {
    if(!this.props.selectedLocation.id){
      this.props.dispatch(setSelectedLocation(this.props.location.id));
      this.props.dispatch(getCurrentCityWeather(this.props.location.geometry));
    }
  };

  render(){
    return(
      <React.Fragment>
        {this.props.location &&
          <p className="locations__country">{this.props.location.country}</p>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: selectLocation(state.locations.locationsList, state.locations.selectedLocation.id),
    selectedLocation: state.locations.selectedLocation
  }
};
export default connect(mapStateToProps)(CurrentLocation);