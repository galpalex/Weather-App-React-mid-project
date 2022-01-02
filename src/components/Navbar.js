import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="cont-navbar">
      <NavLink className="link" to="/" exact>
        Home
      </NavLink>
      <NavLink className="link" to="/24Hours" exact>
        24 Hours Weather Forecast
      </NavLink>
      <NavLink className="link" to="/5Days" exact>
        5 Days Weather Forecast
      </NavLink>
    </div>
  );
};

export default Navbar;
