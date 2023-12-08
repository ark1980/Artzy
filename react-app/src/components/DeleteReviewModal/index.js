import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReviewById, fetchReviewsByProductId } from "../../store/reviews";
import { getProductDetails } from "../../store/products";

function DeleteReviewModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const product = useSelector((state) => state.products.singleProduct);

  const deleteReview = () => {
    dispatch(deleteReviewById(id));
    closeModal();
    // dispatch(getProductDetails(product.id));
    history.push(`/products/${product.id}`);
    window.location.reload();
  };

  return (
    <>
      <h1>Are you sure?</h1>
      <span>Are you sure you want to delete your review?</span>
      <button style={{ cursor: "pointer" }} onClick={() => deleteReview()}>
        Yes Delete it
      </button>
      <button style={{ cursor: "pointer" }} onClick={closeModal}>
        No Keep it
      </button>
    </>
  );
}

export default DeleteReviewModal;
