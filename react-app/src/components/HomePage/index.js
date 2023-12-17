import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/products";
import "./HomePage.css";

const HomePage = () => {
  return (
    <main className="home-page">
      <div className="homepage-content">
        <h1>Welcome to Artzy</h1>
        <h2>Find the perfect gift for your loved ones!</h2>
        <h3>Wrap up the gifting season!</h3>
      </div>
    </main>
  );
};

export default HomePage;
