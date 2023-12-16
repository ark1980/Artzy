import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import HomePage from "./components/HomePage";
import NewProduct from "./components/NewProduct";
import SingleProductPage from "./components/SingleProductPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route exact path="/products/newProduct">
            <NewProduct />
          </Route>
          <Route exact path="/products/:productId">
            <SingleProductPage />
          </Route>
          {/* <Route path="/products">
            <Products />
          </Route> */}
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;
