import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Background extends PureComponent {
  state = {
    bg: ""
  };

  //life cycle=================================================
  componentDidMount() {
    window.addEventListener("resize", this.setSelectedBg);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!!this.props.backgrounds.mobile){
      this.setSelectedBg();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.setSelectedBg);
  };

  // ===========================================================

  setSelectedBg = (error = false) => { // determine
    const {desktop, mobile} = this.props.backgrounds;
    const lowMedia = window.matchMedia("(max-width: 768px)").matches;
    const landscapeM = window.matchMedia(
      "(min-width: 480px) and (max-width: 815px) and (orientation: landscape)").matches;
    const highQuery = window.matchMedia("(min-width: 769px)").matches;
    const endLink = error ? "gif" : "webp"; // if webp is not working check gif
    if(landscapeM){
      this.setState(() => ({bg: `https://media.giphy.com/media/${desktop}/giphy.${endLink}`}));
    }else if (lowMedia){
      this.setState(() => ({bg: `https://media.giphy.com/media/${mobile}/giphy.${endLink}`}));
    }else if(highQuery) {
      this.setState(() => ({bg: `https://media.giphy.com/media/${desktop}/giphy.${endLink}`}));
    }
  };

  handleImgError = () => { // handle img error
    this.setSelectedBg(true);
  };

  render() {
    return (
      <div className="background">
        {
          this.state.bg &&
          <img src={this.state.bg}
               alt="bg"
               onError={this.handleImgError}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    backgrounds: state.backgrounds
  }
};

export default connect(mapStateToProps)(Background);