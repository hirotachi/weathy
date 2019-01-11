import React, {Component} from "react";
import {connect} from "react-redux";
import selectLocation from "../../selectors/selectLocation";


class CurrentLocation extends Component {
  render(){
    return(
      <div>
        selected location
        {this.props.location &&
        <p>{this.props.location.name}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: selectLocation(state.locations.locationsList, state.locations.selectedLocation.id)
  }
};
export default connect(mapStateToProps)(CurrentLocation);