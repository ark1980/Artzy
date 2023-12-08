import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../store/session";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import { fetchReviewsByProductId } from "../../store/reviews";
import "./SingleReviewPage.css";

const SingleReviewPage = ({ productId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(fetchReviewsByProductId(productId));
  }, [dispatch]);

  const users = useSelector((state) => state.session.users);
  const logedInUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.allReviews);

  const usersObj = {};
  if (Array.isArray(users)) {
    users.forEach((user) => (usersObj[user.id] = user));
  }

  return (
    <div>
      {reviews.map((review) => {
        const user = usersObj[review.user_id];
        return (
          <div key={review.id} className="single-review">
            <p className="reviewers-name">
              <p className="bold">{user.username}'s review:</p>
            </p>
            <p>{review.comment}</p>
            <p>
              Rating: <p className="bold">{review.rating}</p>
            </p>
            {user.id === logedInUser.id ? (
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
      })}
    </div>
  );
};

export default SingleReviewPage;
