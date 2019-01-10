import React, {Component} from "react";
import {SearchIcon} from "../../icons/icons";
import {searchText} from "../../../actions/search";


class Search extends Component{
  state = {
    search: ""
  };

  componentWillUnmount() {
    clearTimeout(this.delaySearchResult);
  };

  handleSearchChange = (e) => {
    const search = e.target.value;
    this.setState(() => ({search}));
    clearTimeout(this.delaySearchResult);
    this.delaySearchResult = setTimeout(() => {
      this.startSearch(search);
    }, 2000);
  };

  startSearch = (text) => {
    searchText(text)
  };
  render(){
    return (
      <div>
        <input
          onChange={this.handleSearchChange}
          value={this.state.search}
          type="text"
        />
        <div>
          <SearchIcon/>
        </div>
      </div>
    );
  }
}

export default Search;