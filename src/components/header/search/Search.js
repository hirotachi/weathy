import React, {Component} from "react";
import {connect} from "react-redux";
import {SearchIcon} from "../../icons/icons";
import {clearCurrentSearch, searchText} from "../../../actions/search";
import SearchList from "./SearchList";


class Search extends Component {
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
    if(!!search){
      this.delaySearchResult = setTimeout(() => {
        this.startSearch(search);
      }, 2000);
    }else {
      this.props.dispatch(clearCurrentSearch());
    }

  };

  startSearch = (text) => {
    this.props.dispatch(searchText(text));
  };

  render() {
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
        <div>
          <SearchList/>
        </div>
      </div>
    );
  }
}

export default connect()(Search);