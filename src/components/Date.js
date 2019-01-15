import React, {PureComponent} from "react";
import moment from "moment";

class Date extends PureComponent{
  state = {
    time: moment().format("h:mm a"),
  };

  componentDidMount() { // set time each minute
    this.changeTime = setInterval(() => {
      this.setState(() => ({time: moment().format("h:mm a")}));
    }, 60000);
  };

  componentWillUnmount() {
    clearInterval(this.changeTime);
  };

  render(){
    return (
      <div className="date">
        <span className="date__time">{this.state.time}</span>
        <span className="date__rest">{moment().format("dddd, D MMM 'YY")}</span>
      </div>
    );
  }
}

export default Date;