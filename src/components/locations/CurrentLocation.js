import React, {Component} from "react";
import {connect} from "react-redux";
import selectLocation from "../../selectors/selectLocation";


class CurrentLocation extends Component {
  render(){
    return(
      <div>
        selected location
        {this.props.location &&
        <React.Fragment>
          {
            !!this.props.location.city ?
              <p>{this.props.location.city}</p> :
              <p>{this.props.location.state}</p>
          }
        </React.Fragment>
        }
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