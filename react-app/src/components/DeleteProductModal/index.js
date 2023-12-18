import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeProduct } from "../../store/products";

function DeleteProductModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const deleteProduct = (id) => {
    dispatch(removeProduct(id));
    closeModal();
    history.push("/products");
  };

  return (
    <>
      <h1>Are you sure?</h1>
      <span>Are you sure you want to delete your item?</span>
      <button
        style={{ backgroundColor: "red" }}
        onClick={() => deleteProduct(id)}
      >
        Yes Delete it
      </button>
      <button onClick={closeModal}>No Keep it</button>
    </>
  );
}

export default DeleteProductModal;
