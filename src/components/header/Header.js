import React from "react";
import Search from "./search/Search";

const Header = (props) => (
  <div className="header">
    <Search router={props.router}/>
    <h3 className="header__logo">Weathy</h3>
  </div>
);

export default Header;