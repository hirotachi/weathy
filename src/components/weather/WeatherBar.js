import React, {Component} from "react";

class Weatherbar extends Component{

  setColor = () => {
    const {value} = this.props;
    if(value > 70){
      return "#f63536";
    }else if (value > 50){
      return "#f63536";
    }else {
      return "#78ffa3";
    }
  };
  render(){
    return (
      <div className="bar">
        <div className="bar__container">
          <div
            className="bar__element"
            style={
              {
                width: `${this.props.value}%`,
                backgroundColor: `${this.setColor()}`,
              }
            }
          />
        </div>
      </div>
    );
  }
}

export default Weatherbar;