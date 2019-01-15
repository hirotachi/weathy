import React , {Component} from "react";
import {connect} from "react-redux";


class NetworkError extends  Component {
    render(){
        return(
            <div>
                network error right now we'll try to reconnect for ya
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      networkError : state.search.networkError
  };
};
export default connect(mapStateToProps)(NetworkError);