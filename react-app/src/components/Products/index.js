import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/products";

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.products.products);

  return (
    <div className="products-container">
      <ul>
        {products.map((product) => {
          return <li key={product.key}>{product.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Products;
