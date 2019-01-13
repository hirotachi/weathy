import React from "react";
import Search from "./search/Search";

const Header = () => (
  <div className="header">
    <Search/>
    <h3 className="header__logo">Weathy</h3>
  </div>
);

export default Header;