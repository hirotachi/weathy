import React, {Component} from "react";
import clickHandler from "./clickHandler";
import {connect} from "react-redux";


class Slider extends Component{

  componentDidMount() {
    const mainClass = this.props.children.props.className;
    clickHandler(mainClass);
  };

  render(){
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations.list
  }
};
export default connect(mapStateToProps)(Slider);
