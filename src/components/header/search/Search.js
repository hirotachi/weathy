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

  componentDidMount() {
    window.addEventListener("resize", this.adjustHeader);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.onpopstate = () => {
      this.handleOpenSearchBar();
    };
  }

  componentWillUnmount() {
    clearTimeout(this.delaySearchResult);
    clearTimeout(this.delayAction);
    window.removeEventListener("resize", this.adjustHeader);
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
        history.push("/");
      }
      this.animateSearchBar("close");
      this.setState(() => ({focused:false}));
      this.delay(() =>
        this.setState(() => ({show: !this.state.show})), 1000);
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
    const mediaQuery = window.matchMedia("(min-width: 480px)").matches;
    if(!this.state.show && !mediaQuery){
      logo.style.transform = "translate3d(0, -100%, 0)";
      logo.style.opacity = 0;
    }else {
      this.delay(() => logo.removeAttribute("style"), 1000);
    }
  };

  animateSearchBar = (command = "resized") => { // animate search bar upon open or close
    const input = document.querySelector(".search__input--bar");
    const searchIcon = document.querySelector(".search__icon svg");
    const searchSection = document.querySelector(".search");
    const mediaQuery = window.matchMedia("(min-width: 480px)").matches;
    if (command === "open") {
      input.style.animation = "ShowInput .5s ease-in-out forwards";
      searchIcon.style.fill = "black";
      searchIcon.style.width = "3rem";
      if(mediaQuery){
        searchSection.style.width = "35%";
      }
    }else if (command === "close"){
      input.removeAttribute("style");
      input.style.width = "100%";
      input.style.opacity = 1;
      if(mediaQuery) {
        searchSection.removeAttribute("style")
      }
      this.delay(() => {
        input.style.opacity = 0;
        input.style.width = "0";
      }, 100);
      this.delay(() => {
        searchIcon.removeAttribute("style");
      }, 500);
    }
  };
  adjustHeader = () => { // adjust header section on resize
    const mediaQuery = window.matchMedia("(min-width: 480px)").matches;
    const searchSection = document.querySelector(".search");
    const logo = document.querySelector(".header__logo");
    if(this.state.show){
      if(mediaQuery){
        logo.removeAttribute("style");
        searchSection.style.width = "35%";
      }else {
        searchSection.removeAttribute("style");
        logo.style.transform = "translate3d(0, -100%, 0)";
        logo.style.opacity = 0;
      }
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