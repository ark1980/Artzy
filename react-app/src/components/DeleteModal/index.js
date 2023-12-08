import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeProduct } from "../../store/products";

function DeleteModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const deleteProduct = () => {
    dispatch(removeProduct(id));
    closeModal();
    history.push("/products");
  };

  return (
    <>
      <h1>Are you sure?</h1>
      <span>Are you sure you want to delete your item?</span>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => deleteProduct()}
        className="signup_login_button"
      >
        Yes Delete it
      </button>
      <button
        style={{ cursor: "pointer" }}
        onClick={closeModal}
        className="signup_login_button keep_item"
      >
        No Keep it
      </button>
    </>
  );
}

export default DeleteModal;
