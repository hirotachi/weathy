import React, {Component} from "react";
import {connect} from "react-redux";
import {SearchIcon} from "../../icons/icons";
import {clearCurrentSearch, searchText} from "../../../actions/search";
import SearchList from "./SearchList";


class Search extends Component {
  state = {
    search: "",
    focused: false
  };

  componentWillUnmount() {
    clearTimeout(this.delaySearchResult);
    clearTimeout(this.delaySearchBlur);
  };

  focusInput = () => {
    this.setState(() => ({focused: true}));
  };
  blurInput = () => {
    this.delaySearchBlur = setTimeout(() => {
    this.setState(() => ({focused: false}));
    }, 100)
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
      <div className="search">
        <div className="search__input">
          <input
            onChange={this.handleSearchChange}
            value={this.state.search}
            type="text"
            placeholder="City, Zip code"
            onFocus={this.focusInput}
            onBlur={this.blurInput}
          />
          <SearchList text={this.state.search} focused={this.state.focused}/>
        </div>
          <SearchIcon/>
      </div>
    );
  }
}

export default connect()(Search);