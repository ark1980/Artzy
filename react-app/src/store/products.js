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

const updateProduct = (productId) => ({ type: UPDATE_PRODUCT, productId });

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
  });
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(createProduct(data));
    return data;
  }
};

export const updateProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/product/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    if (data.erros) {
      return data.errors;
    }
    dispatch(updateProduct(data));
    return data;
  }
};

// Reducers =================================================
const initialState = {
  products: {},
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

export default productsReducer;
