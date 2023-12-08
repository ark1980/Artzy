import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../store/session";
import "./SingleReviewPage.css";

const SingleReviewPage = ({ review }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.session.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (!review) {
    console.error("Review is undefined");
    return null;
  }

  const { user_id, comment, rating } = review;
  if (user_id === undefined || comment === undefined || rating === undefined) {
    console.error("Review does not have the expected properties");
    return null;
  }

  const usersObj = {};
  if (Array.isArray(users)) {
    users.forEach((user) => (usersObj[user.id] = user));
  }

  const user = usersObj[user_id];
  if (!user) {
    console.error(`No user found with id ${user_id}`);
    return null;
  }

  return (
    <div className="single-review">
      <p className="reviewers-name">
        <b>{user.first_name}'s review:</b>
      </p>
      <p>{comment}</p>
      <p>
        Rating: <b>{rating}</b>
      </p>
    </div>
  );
};

export default SingleReviewPage;
