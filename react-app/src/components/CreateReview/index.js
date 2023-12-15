// CreateReview.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewForProduct } from "../../store/reviews";
import { getProductDetails } from "../../store/products";
import { useModal } from "../../context/Modal";
import "./CreateReview.css";

const CreateReview = ({ productId }) => {
  const [reviewData, setReviewData] = useState({ comment: "", rating: 1 });
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  // const singleProduct = useSelector((state) => state.products.singleProduct);

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    dispatch(createReviewForProduct(productId, reviewData));
    closeModal();
    dispatch(getProductDetails(productId));
    history.push(`/products/${productId}`);
  };

  return (
    <div className="create-review-container">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit} className="create-review-form">
        <textarea
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          placeholder="Your review"
          className="review-textarea-field"
        />
        <input
          type="number"
          name="rating"
          value={reviewData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="review-input-field"
        />
        <button type="submit" className="review-submit-button">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
