import React, {Component} from "react";
import {connect} from "react-redux";
import shortid from "shortid";


class SearchList extends Component{

  handleCityClick = (city) => {
    console.log(city.name, city.country.name)
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
    searchList : state.search
  }
};

export default connect(mapStateToProps)(SearchList);