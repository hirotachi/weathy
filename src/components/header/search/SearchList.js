import React, {Component} from "react";
import {connect} from "react-redux";
import shortid from "shortid";
import {getCurrentCityWeather} from "../../../actions/weather";
import {addLocation, setSelectedLocation} from "../../../actions/locations";


class SearchList extends Component {


  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.search.result.length > 0){
      this.styleLoading();
    }
  };

  styleLoading = () => { // style loading bars accordingly
    const loader = document.querySelector(".search__load");
    if(loader){
      loader.style.display = "none";
    }
  };

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
    if (this.props.search.result.length > 0) {
      return `${8 * this.props.search.result.length}rem`;
    }
    return "8rem";
  };


  render() {
    return (
      <div className="search__list"
           style={{height: `${!!this.props.text ? this.sizeSearchList() : "0"}`}}>
        {
          this.props.text && this.props.focused && !this.props.search.noResult && <div
            className={`search__load ${this.props.search.result.length > 0 ? "fade-out" : "fade-in"} `}>
            <span className="search__load--icons"/>
            <span className="search__load--icons"/>
            <span className="search__load--icons"/>
          </div>
        }
        {
          this.props.focused &&
          <React.Fragment>
            {
              this.props.search.noResult ? // handle if there is no result returned
                  <p className="search__noResult fade-in">Sorry nothing came up for "{this.props.text}",
                  try using a zip code.</p> :
                  this.props.search.result.map(location =>
                  <div className="search__result fade-in"
                       onClick={() => this.handleCityClick(location)}
                       key={shortid()}>
                    <p>{location.city || location.state || this.props.text}, {location.country}</p>
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
    search: state.search,
    locationsList: state.locations.locationsList
  }
};

export default connect(mapStateToProps)(SearchList);