import React, {Component} from "react";
import {connect} from "react-redux";
import shortid from "shortid";
import {getCurrentCityWeather} from "../../../actions/weather";
import {addLocation, setSelectedLocation} from "../../../actions/locations";


class SearchList extends Component {



  handleCityClick = (city) => {
    const {id, geometry} = city;
    const checkLocationExist = this.props.locationsList.some(location => {
      return location.id === id ;
    });
    if (!checkLocationExist) { // check if the location selected is already in list before adding
      this.props.dispatch(addLocation(city));
      this.props.dispatch(getCurrentCityWeather(geometry));
      this.props.dispatch(setSelectedLocation(id));
    }else if(checkLocationExist){
      this.props.locationsList.map(location => {
        if(location.city === city.city && location.country === city.country){
          this.props.dispatch(setSelectedLocation(location.id));
          this.props.dispatch(getCurrentCityWeather(location.geometry));
        }
      })
    }
  };


  sizeSearchList = () => { // return size depending on search list location length if there is any
    if(!this.props.focused){
      return "0";
    }
    if (this.props.searchList.length > 0) {
      return `${8 * this.props.searchList.length}rem`;
    }
    return "8rem";
  };


  render() {
    return (
      <div className="search__list"
           style={{height: `${!!this.props.text ? this.sizeSearchList() : "0"}`}}>
        {
          this.props.text && <div
            className={`${this.props.searchList.length > 0 ? "fade-out" : "fade-in"} `}>loading ...</div>
        }
        {
          this.props.focused &&
          this.props.searchList.map(location =>
            <div className="search__result fade-in"
                 onClick={() => this.handleCityClick(location)}
                 key={shortid()}>
              <p>{location.city || location.state || this.props.text}, {location.country}</p>
            </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchList: state.search,
    locationsList: state.locations.locationsList
  }
};

export default connect(mapStateToProps)(SearchList);