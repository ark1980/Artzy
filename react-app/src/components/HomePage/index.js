import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/products";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Artzy</h1>
      <h3>Wrap up the gifting season!</h3>
      <NavLink to="/products">Shop now</NavLink>
    </div>
  );
};

export default HomePage;
