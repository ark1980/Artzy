import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navigation-bar">
      <NavLink exact to="/">
        <h2 className="logo">Artzy</h2>
      </NavLink>
      <div className="search-bar">
        <input type="text" placeholder="Search for anything" />
      </div>
      <ul>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
