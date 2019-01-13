import React, {Component} from "react";
import {connect} from "react-redux";
import {SearchIcon} from "../../icons/icons";
import {clearCurrentSearch, searchText} from "../../../actions/search";
import SearchList from "./SearchList";


class Search extends Component {
  state = {
    search: "",
    focused: false,
    show: false
  };

  // lifeCycle==========================================

  componentWillUnmount() {
    clearTimeout(this.delaySearchResult);
    clearTimeout(this.delaySearchBlur);
    clearTimeout(this.delayShowSearchBar);
  };
  // input bar list animation handling==========================================
  focusInput = () => {
    this.setState(() => ({focused: true}));
  };
  blurInput = () => {
    this.delaySearchBlur = setTimeout(() => {
      this.setState(() => ({focused: false}));
    }, 100)
  };

  // input handlers========================================
  handleSearchChange = (e) => {
    const search = e.target.value;
    this.setState(() => ({search}));
    clearTimeout(this.delaySearchResult);
    if(!!search){
      this.delaySearchResult = setTimeout(() => {
        this.startSearch(search);
      }, 1000);
    }else {
      this.props.dispatch(clearCurrentSearch());
    }

  };
  // search bar show handling========================================
  handleOpenSearchBar = () => {
    this.delayShowSearchBar = setTimeout(() => {
      this.setState(() => ({show: !this.state.show}));
    }, 500);
    this.AnimateLogo();
  };
  // dispatch search========================================
  startSearch = (text) => {
    this.props.dispatch(searchText(text));
  };
  // logo animation handling==============================================
  AnimateLogo = () => {
    const logo = document.querySelector(".header__logo");
    if(!this.state.show){
      logo.style.transform = "translate3d(0, -100%, 0)";
      logo.style.opacity = 0;
    }else {
      logo.removeAttribute("style")
    }
  };

  //======================================================================






  render() {
    return (
      <div className="search">

        <div className="search__input">
          {
            this.state.show &&
            <input
              onChange={this.handleSearchChange}
              value={this.state.search}
              type="text"
              placeholder="City, Zip code"
              onFocus={this.focusInput}
              onBlur={this.blurInput}
              autoFocus={true}
            />
          }
          <SearchList text={this.state.search} focused={this.state.focused}/>
        </div>
          <span className="search__icon" onClick={this.handleOpenSearchBar}><SearchIcon/></span>
      </div>
    );
  }
}

export default connect()(Search);