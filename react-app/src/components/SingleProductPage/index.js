import { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, removeProduct } from "../../store/products";
import "./SingleProductPage.css";
import SingleReviewPage from "../SingleReviewPage";

const SingleProductPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.singleProduct);

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <div className="single-product-page-container">
      <span className="back-to-products">
        <NavLink to="/products">Back to all products</NavLink>
      </span>
      <div className="product-details">
        <div className="img-container">
          <img src="/images/no-image.png" alt="" />
        </div>
        <div className="content-container">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="rating-container">Customer's Rating: {product.stars}</p>
          <input
            className="input-qnt"
            type="number"
            min={0}
            placeholder="Qty"
          />
          <button className="btn-add-to-cart">Add to cart</button>
        </div>
      </div>
      <div className="reviews">
        <h3>Customer's Reviews</h3>
        {Array.isArray(product.reviews) &&
          product.reviews.map((review) => (
            <SingleReviewPage review={review} key={review.id} />
          ))}
      </div>
    </div>
  );
};

export default SingleProductPage;
