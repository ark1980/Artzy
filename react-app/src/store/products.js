const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
const SINGLE_PRODUCT = "products/SINGLE_PRODUCTS";
const ALL_PRODUCTS_BY_USER = "products/ALL_PRODUCTS_BY_USER";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCTS";
const CREATE_PRODUCT = "products/CREATE_PRODUCTS";
// const ADD_PHOTOS = "products/ADD_PHOTOS";
const UPDATE_PRODUCT = "products/UPDATE_PRODUCTS";

// ACTIONS =================================================
const allProducts = (products) => ({ type: GET_ALL_PRODUCTS, products });

const singleProduct = (product) => ({ type: SINGLE_PRODUCT, product });

export const allProductsByUserId = (productId) => ({
  type: ALL_PRODUCTS_BY_USER,
  productId,
});

export const deleteProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  productId,
});

const createProduct = (product) => ({ type: CREATE_PRODUCT, product });

const updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });

// THUNKS =================================================
export const getAllProducts = () => async (dispatch) => {
  const res = await fetch("/api/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(allProducts(data));
    return data;
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(singleProduct(data));
    return data;
  }
};

export const createNewProduct = (product) => async (dispatch) => {
  const res = await fetch("/api/products/add_product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(createProduct(data));
    return data;
  } else {
    const errorData = await res.json();
    return errorData.errors || ["An error occurred while creating the product"];
  }
};

export const updateProductThunk =
  (productId, updatedProductData) => async (dispatch) => {
    const res = await fetch(`/api/products/product/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductData),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
      dispatch(updateProduct(data));
      return data;
    } else {
      const errorData = await res.json();
      return (
        errorData.errors || ["An error occurred while updating the product"]
      );
    }
  };

export const removeProduct = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/product/${productId}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  if (res.ok) {
    dispatch(deleteProduct(productId));
  }
  // if (res.ok) {
  //   const data = await res.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  //   dispatch(deleteProduct(productId));
  //   return data;
  // } else {
  //   const errorData = await res.json();
  //   return errorData.errors || ["An error occurred while deleting the product"];
  // }
};

// Reducers =================================================
const initialState = {
  // products: {},
  // singleProduct: {},
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      // return { ...state, products: action.products };
      const newState = {};
      action.products.forEach((product) => (newState[product.id] = product));
      // return { ...state, products: newState };
      return newState;
    case SINGLE_PRODUCT: {
      return { ...state, singleProduct: action.product };
    }
    case CREATE_PRODUCT:
      return { ...state, ...action.product };
    case REMOVE_PRODUCT: {
      const newState = { ...state };
      delete newState[action.productId];
      return newState;
    }
    case UPDATE_PRODUCT:
      const updatedProduct = action.product;
      return {
        ...state,
        [updatedProduct.id]: updatedProduct,
      };
    default:
      return state;
  }
};

export default productsReducer;
