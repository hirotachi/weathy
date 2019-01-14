import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "../components/Homepage";

class AppRouter extends  Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/" component={HomePage}/>
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;