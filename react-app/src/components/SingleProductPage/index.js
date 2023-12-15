import { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, removeProduct } from "../../store/products";
import "./SingleProductPage.css";
import SingleReviewPage from "../SingleReviewPage";
import DeleteProductModal from "../DeleteProductModal";
import OpenModalButton from "../OpenModalButton";
import UpdateProduct from "../UpdateProduct";
import CreateReview from "../CreateReview";

const SingleProductPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  const products = useSelector((state) => state.products);
  const product = products[productId];
  const user = useSelector((state) => state.session.user);

  return (
    <div className="single-product-page-container">
      <div className="back-to-products">
        <NavLink to="/products">Back to all products</NavLink>
        {!user || product.owner_id !== user.id ? null : (
          <div className="btn_delete_and_update">
            <OpenModalButton
              buttonText="delete"
              modalComponent={<DeleteProductModal id={productId} />}
            />
            <OpenModalButton
              buttonText="update"
              modalComponent={<UpdateProduct productId={productId} />}
            />
          </div>
        )}
      </div>
      <div className="product-details">
        <div className="img-container">
          <img src="/images/no-image.png" alt="" />
        </div>
        <div className="content-container">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="rating-container">
            Customer's Rating:{" "}
            {!product.stars ? "No rating yet" : product.stars}
          </p>
          {user.id !== product.owner_id ? (
            <NavLink to="/create_review">write a review</NavLink>
          ) : null}

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
        {/* {Array.isArray(product.reviews) &&
          product.reviews.map((review) => (
            <SingleReviewPage review={review} key={review.id} />
          ))} */}
        <SingleReviewPage product={product} />
      </div>
    </div>
  );
};

export default SingleProductPage;
