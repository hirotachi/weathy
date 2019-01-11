import React, {Component} from "react";
import {connect} from "react-redux";
import shortid from "shortid";


class Location extends Component{
  render(){
    return (
      <div>
        {
          this.props.locations.length > 0 &&
            this.props.locations.map(location =>
              <p key={shortid()}>{location.name}</p>)
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