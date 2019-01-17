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

  // ===========================================================

  setSelectedBg = () => { // determine
    const {desktop, mobile} = this.props.backgrounds;
    const lowMedia = window.matchMedia("(max-width: 768px)").matches;
    const landscapeM = window.matchMedia(
      "(min-width: 480px) and (max-width: 815px) and (orientation: landscape)").matches;
    const highQuery = window.matchMedia("(min-width: 769px)").matches;
    if(landscapeM){
      console.log("landscape")
      this.setState(() => ({bg: desktop}));
    }else if (lowMedia){
      console.log("lowmedia")
      this.setState(() => ({bg: mobile}));
    }else if(highQuery) {
      console.log("desktop")
      this.setState(() => ({bg: desktop}));
    }
  };

  render() {
    return (
      <div className="background">
        {
          this.state.bg &&
          <img src={`https://media.giphy.com/media/${this.state.bg}/giphy.gif`} alt="bg"/>
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