import React, {PureComponent} from "react";
import moment from "moment";

class Date extends PureComponent{
  state = {
    time: moment().format("h:mm a"),
  };

  componentDidMount() {
    this.changeTime = setInterval(() => {
      this.setState(() => ({time: moment().format("h:mm a")}));
    }, 60000);
  };

  componentWillUnmount() {
    clearInterval(this.changeTime);
  };

  render(){
    return (
      <div>
        <span>{this.state.time}</span>
        <span>{moment().format("dddd, D MMM 'YY")}</span>
      </div>
    );
  }
}

export default Date;