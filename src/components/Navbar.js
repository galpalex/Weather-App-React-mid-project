import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="cont-navbar">
      <NavLink className="link" to="/" exact>
        Home
      </NavLink>
      <NavLink className="link" to="/Favorite" exact>
        My
        <span className="red" aria-label="heart" role="img">
          ❤️
        </span>
        Cities
      </NavLink>
      <NavLink className="link" to="/5Days" exact>
        5 Days
      </NavLink>
    </div>
  );
};

export default Navbar;
