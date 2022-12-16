import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav-bar">
      <ul className="flex-row-center">
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/new-user"}
          >
            Add new user
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/new-account"}
          >
            Add new account
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/new-transaction"}
          >
            Add new transaction
          </NavLink>
        </li>
        <Search />
      </ul>
    </div>
  );
}

export default Navbar;
