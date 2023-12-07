import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { createNewProduct } from "../../store/products";
import "./NewProduct.css"; // Import the CSS file

const NewProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity_available: 1,
  });

  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [res, setRes] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    let formErrors = [];

    // Check if any field is empty
    Object.keys(productData).forEach((key) => {
      if (!productData[key] && key !== "quantity_available") {
        formErrors.push(`${key.replace("_", " ")} is required.`);
      }
    });

    // Check if Name and Description start with a number
    if (/^\d/.test(productData.name)) {
      formErrors.push("Name cannot start with a number.");
    }

    if (/^\d/.test(productData.description)) {
      formErrors.push("Description cannot start with a number.");
    }

    setErrors(formErrors);
    return formErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateForm()) return;

    const formattedData = {
      ...productData,
      price: Number(parseFloat(productData.price).toFixed(2)),
      quantity_available: parseInt(productData.quantity_available, 10) || 1,
    };

    const response = await dispatch(createNewProduct(formattedData));
    if (response) {
      console.log("Seccessfully created a new product!", response);
    }
    setSuccessMsg(true);
    setProductData({
      name: "",
      price: "",
      description: "",
      category: "",
      quantity_available: 1,
    });

    // console.log(response);
    history.push(`/products/${response.product_id}`);
  };

  return (
    <div className="new-product-container">
      <h2>Create a new product</h2>
      <form onSubmit={handleSubmit} className="new-product-form">
        {errors.length > 0 && (
          <div className="form-errors">
            {errors.map((error, index) => (
              <p key={index} className="error">
                {error}
              </p>
            ))}
          </div>
        )}
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="input-field"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input-field"
        />
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea-field"
        />
        <select
          name="category"
          onChange={handleChange}
          value={productData.category}
          className="select-field"
        >
          <option value="">Select a Category</option>
          <option value="Clothing">Clothing</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Home and living items">Home and Living Items</option>
          <option value="Accessories">Accessories</option>
          <option value="Crafts and supplies">Crafts and Supplies</option>
          <option value="Electronics">Electronics</option>
          <option value="Arts">Arts</option>
          <option value="Dev stuff">Dev's Stuff</option>
        </select>
        <input
          type="number"
          name="quantity_available"
          value={productData.quantity_available}
          onChange={handleChange}
          placeholder="Quantity Available"
          className="input-field"
          min={1}
        />
        <button type="submit" className="submit-button">
          Create Product
        </button>
        {successMsg && (
          <div>
            <p>Successfully created a new product!</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewProduct;
