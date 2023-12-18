const GET_REVIEWS_BY_PRODUCT = "reviews/GET_REVIEWS_BY_PRODUCT";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";

// Action Creators ============================================
const getReviewsByProduct = (reviews) => ({
  type: GET_REVIEWS_BY_PRODUCT,
  reviews,
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

const updateReview = (id, data) => ({
  type: 'UPDATE_REVIEW',
  review: { id, ...data },
});

// Thunk Action Creators ============================================
export const fetchReviewsByProductId = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviewsByProduct(reviews));
  }
};

export const createReviewForProduct =
  (productId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (response.ok) {
      const review = await response.json();
      dispatch(createReview(review));
    }
  };

export const deleteReviewById = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
};

export const updateReviewById = (reviewId, reviewData) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });
  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateReview(updatedReview));
    return updatedReview;
  }
};

// Rview Reducers ===================================================
const initialState = { allReviews: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_PRODUCT: {
      return {
        ...state,
        allReviews: action.reviews,
      };
    }
    case CREATE_REVIEW: {
      const { product_id, ...review } = action.review;
      return {
        ...state,
        [product_id]: state[product_id]
          ? [...state[product_id], review]
          : [review],
      };
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      if (newState[action.productId]) {
        newState[action.productId] = newState[action.productId].filter(
          (review) => review.id !== action.reviewId
        );
      }
      return newState;
    }
    case UPDATE_REVIEW: {
        const updatedReview = action.review;
        const productId = updatedReview.product_id; // assuming the review object has a product_id field
        return {
          ...state,
          [productId]: state[productId].map(review => 
            review.id === updatedReview.id ? updatedReview : review
          ),
        };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
