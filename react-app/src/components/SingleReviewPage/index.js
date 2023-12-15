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

  const users = useSelector((state) => state.session.users);
  const logedInUser = useSelector((state) => state.session.user);
  // const reviews = useSelector((state) => state.reviews.allReviews);
  const reviews = product.reviews;

  return (
    <div>
      {!reviews.length ? (
        <p>No reviews yet</p>
      ) : (
        Array.isArray(reviews) &&
        reviews.map((review) => {
          return (
            <div key={review.id} className="single-review">
              <p className="reviewers-name">
                {/* <p className="bold">{user.username}'s review:</p> */}
              </p>
              <p>{review.comment}</p>
              <p>
                Rating: <p className="bold">{review.rating}</p>
              </p>
              {review.user_id === logedInUser.id ? (
                <div>
                  <OpenModalButton
                    buttonText="delete"
                    modalComponent={<DeleteReviewModal id={review.id} />}
                  />
                  <button>update</button>
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
