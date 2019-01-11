import React, {Component} from "react";
import {connect} from "react-redux";
import shortid from "shortid";
import {getCurrentCityWeather} from "../../../actions/weather";
import {addLocation, setSelectedLocation} from "../../../actions/locations";


class SearchList extends Component{

  handleCityClick = (city) => {
    const {id, name, country} = city;
    const {abbreviation: countryAbbr} = country;
    this.props.dispatch(getCurrentCityWeather({name, countryAbbr}));
    this.props.dispatch(setSelectedLocation(id));
    const checkLocationExist = this.props.locationsList.some(location => location.id === city.id);
    if(!checkLocationExist){ // check if the location selected is already in list before adding
      this.props.dispatch(addLocation(city));
    }
  };
  render(){
    return (
      <div>
        {
          this.props.searchList.length === 0 ?
            <p>no search currently</p> :
            <React.Fragment>
              {
                this.props.searchList.map(city =>
                <div onClick={() => this.handleCityClick(city)} key={shortid()}>
                  <p>city: {city.name}</p>
                  <p>country: {city.country.name}</p>
                </div>)
              }
            </React.Fragment>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    searchList : state.search,
    locationsList: state.locations.locationsList
  }
};

export default connect(mapStateToProps)(SearchList);