import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateReviewById, fetchReviewsByProductId, createReviewForProduct } from "../../store/reviews";
import {getProductDetails, getAllProducts} from "../../store/products";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const UpdateReviewModal = ({ productId, review }) => {
  const [reviewData, setReviewData] = useState({ comment: "", rating: 1 });
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    setReviewData({comment: review.comment, rating: review.rating})
  }, [review]);

  console.log(review);
  

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateReviewById(review.id, reviewData));
    closeModal();
    await dispatch(getProductDetails(productId));
    await dispatch(getAllProducts());
    history.push(`/products/${productId}`);
  };

  return (
    <div className="create-review-container">
      <label className="labels" htmlFor="comment" style={{ display: "block" }}>
        Update your review
      </label>
      <form onSubmit={handleSubmit}>
        <textarea
          id="comment"
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          placeholder="Your review"
          className="review-textarea-field"
        />
        <div className="rating">
          <label
            className="labels"
            htmlFor="rating"
            style={{ display: "block" }}
          >
            Stars
          </label>
          <input
            id="rating"
            type="number"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="review-input-field"
          />
        </div>
        <button type="submit" className="review-submit-button">
          Submit Review
        </button>
        <button className="cancel-button" onClick={() => closeModal()}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateReviewModal;
