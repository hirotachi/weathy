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
      <div>
        <div style={{backgroundColor: "grey", width: "200px", height: "1rem", position: "relative"}}>
          <div
            style={
              {
                position: "absolute",
                height: "100%",
                width: `${this.props.value}%`,
                backgroundColor: `${this.setColor()}`,
                transition: "all .5s ease-in-out"
              }
            }
          />
        </div>
      </div>
    );
  }
}

export default Weatherbar;