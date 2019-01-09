import React, {Component} from "react";
import {SearchIcon} from "../../icons/icons";


class Search extends Component{
  state = {
    search: ""
  };

  handleSearchChange = (e) => {
    const search = e.target.value;
    this.setState(() => ({search}));
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