import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/products";
import ProductCard from "../ProductCard";
import HomePage from "../HomePage";
import "./Products.css";

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);
  const productsList = Object.values(products);

  return (
    <>
      <HomePage />
      <ul className="products-container">
        {Array.isArray(productsList) &&
          productsList.map((product) => <ProductCard product={product} key={product.id}/>)}
      </ul>
    </>
  );
}

export default Products;
