import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReviewById, fetchReviewsByProductId } from "../../store/reviews";
import { getProductDetails, getAllProducts } from "../../store/products";

function DeleteReviewModal({ id, productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const deleteReview = async () => {
    dispatch(deleteReviewById(id));
    closeModal();
    await dispatch(fetchReviewsByProductId(productId));
    await dispatch(getAllProducts());
    history.push(`/products/${productId}`);
    // window.location.reload();
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
