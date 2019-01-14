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

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.onpopstate = () => {
      this.handleOpenSearchBar();
    };
  }

  componentWillUnmount() {
    clearTimeout(this.delaySearchResult);
    clearTimeout(this.delayAction);
  };

  // input bar list animation handling==========================================
  focusInput = () => {
    this.setState(() => ({focused: true}));
  };
  blurInput = () => {
    this.delay(() => this.setState(() => ({focused: false})), 100);
  };

  // input handlers========================================
  handleSearchChange = (e) => { // delay call to api while typing
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
    const {history, location} = this.props.router;
    if(!this.state.show){
      this.delay(() => {
        history.push("/search");
        this.setState(() => ({show: !this.state.show}));
        this.animateSearchBar("open");
      }, 500);
    }else if (this.state.show) {
      if(location.pathname === "/search"){
        history.push("/")
      }
      this.animateSearchBar("close");
      this.delay(() => this.setState(() => ({show: !this.state.show})), 500);
    }
    this.animateLogo();
  };
  // dispatch search========================================
  startSearch = (text) => {
    this.props.dispatch(searchText(text));
  };
  // logo animation handling==============================================
  animateLogo = () => {
    const logo = document.querySelector(".header__logo");
    if(!this.state.show){
      logo.style.transform = "translate3d(0, -100%, 0)";
      logo.style.opacity = 0;
    }else {
      this.delay(() => logo.removeAttribute("style"), 500);
    }
  };

  animateSearchBar = (command) => { // animate search bar upon open or close
    const input = document.querySelector(".search__input--bar");
    const searchIcon = document.querySelector(".search__icon svg");
    if (command === "open") {
      input.style.animation = "ShowInput .5s ease-in-out forwards";
      searchIcon.style.fill = "black";
      searchIcon.style.width = "3rem";
    }else if (command === "close"){
      input.removeAttribute("style");
      input.style.width = "100%";
      input.style.opacity = 1;
      this.delay(() => {
        input.style.width = "0";
        input.style.opacity = 1;
        searchIcon.removeAttribute("style");
      }, 100);
    }
  };

  delay = (func, time) => { // delays functions
    this.delayAction = setTimeout(func, time);
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
              className="search__input--bar"
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