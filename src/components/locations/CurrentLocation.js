import React, {Component} from "react";
import {connect} from "react-redux";
import shortid from "shortid";
import {setSelectedLocation} from "../../actions/locations";


class CurrentLocation extends Component {

  componentDidMount() { // set initial country on the redux store
    this.props.dispatch(setSelectedLocation(this.props.locations[0].id));
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.selectedLocation.id !== this.props.selectedLocation.id;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.selectedLocation.id !== this.props.selectedLocation.id){
      this.slideCountryList();
    }
  };

  slideCountryList = () => { // returns the percentage that country list slider moves by depending on index
    let currentIndex = 0;
    this.props.locations.map((location, index) => {
      if(location.id === this.props.selectedLocation.id){
        currentIndex = index * 100;
      }
    });
    return currentIndex;
  };


  render(){
    return(
      <div className="locations__country">
        {this.props.locations &&
        <div className="locations__country--list"
             style={{transform: `translate3d(-${this.slideCountryList()}%, 0, 0)`}}>
          {this.props.locations.map((location) =>
              <p key={shortid()}
                 className={`
                 ${location.id  === this.props.selectedLocation.id ? "active-country" : ""}
                 `}>
                {location.country}
              </p>
            )
          }
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations.locationsList,
    selectedLocation: state.locations.selectedLocation
  }
};
export default connect(mapStateToProps)(CurrentLocation);