import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../store/session";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import { fetchReviewsByProductId } from "../../store/reviews";
import "./SingleReviewPage.css";

const SingleReviewPage = ({ product }) => {
  // const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    // dispatch(fetchReviewsByProductId(productId));
  }, [dispatch]);

  const reviews = product.reviews;
  const logedInUser = useSelector((state) => state.session.user);
  // const users = useSelector((state) => state.session.users);
  
  

  if (!logedInUser) {
    return (
      <div>
      {!reviews.length ? (
        <p>No reviews yet</p>
      ) : (
        Array.isArray(reviews) &&
        reviews.map((review) => {
          return (
            <div key={review.id} className="single-review">
              <p>{review.comment}</p>
              <p>
                Rating: <p className="bold">{review.rating}</p>
              </p>
            </div>
          );
        })
      )}
    </div>
    )
  }


  return (
    <div>
      {!reviews.length ? (
        <p>No reviews yet</p>
      ) : (
        Array.isArray(reviews) &&
        reviews.map((review) => {
          return (
            <div key={review.id} className="single-review">
            {/* <p className="reviewers-name">
                <p className="bold">{}'s review:</p>
              </p> */}
              <p>{review.comment}</p>
              <p>
                Rating: <p className="bold">{review.rating}</p>
              </p>
              {review.user_id === logedInUser.id ? (
                <div>
                  <OpenModalButton
                    buttonText="delete"
                    modalComponent={
                      <DeleteReviewModal
                        productId={product.id}
                        id={review.id}
                      />
                    }
                  />
                  <OpenModalButton
                    buttonText="update"
                    modalComponent={
                      <DeleteReviewModal
                        productId={product.id}
                        id={review.id}
                      />
                    }
                  />
                </div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SingleReviewPage;
