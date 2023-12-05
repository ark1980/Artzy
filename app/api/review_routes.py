from crypt import methods
from email import message
from itertools import product
import json
from os import error
from flask import Blueprint, jsonify, request
from flask_migrate import current
from app.api.auth_routes import login
from app.models import db, Product, Category, Review
from flask_login import current_user, login_required
from app.forms import CreateReview


review_routes = Blueprint('reviews', __name__)


# Get all Reviews by a Produtc's id ==========================================
@review_routes.route('/<int:productId>')
def get_reviews_by_product_id(productId):
    reviews = Review.query.filter(Review.product_id == productId).all()

    if not reviews:
        return jsonify({"message": "The productd does not have review yet"}), 404

    product_reviews = [review.to_dict() for review in reviews]

    return jsonify(product_reviews)


# Get all Reviews of the Current User ==========================================
@review_routes.route('/user/<int:userId>')
def get_reviews_by_user_id(userId):

    if current_user.id == userId:
        reviews = Review.query.filter(Review.user_id == userId).all()

        if not reviews:
            return jsonify({"message": "The productd does not have review yet"}), 404

        user_reviews = [review.to_dict() for review in reviews]
        return jsonify(user_reviews)

    return jsonify({'message': 'Unauthorized user'}), 403


# Create a new Review for a product ==========================================
@review_routes.route('/products/<int:productId>/reviews', methods=['POST'])
@login_required
def create_new_review(productId):

    product = Product.query.get(productId)

    if current_user.id == product.owner_id:
        return jsonify({"message": "Owner of product not allowed to leave a review on their own product."}), 403

    form = CreateReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    """
        uncomment the below line and fix indentation for front-end
    """
    # if form.validate_on_submit():
    data = form.data

    new_review = Review(
        user_id=current_user.id,
        product_id=productId,
        comment=data['comment'],
        rating=data['rating']
    )

    if not new_review:
        return jsonify({'message': 'Missing required data'}), 400

    # Add new Review to the database
    db.session.add(new_review)
    db.session.commit()

    return jsonify({'message': 'Review created successfully', 'review_id': new_review.id})


# Delete a Review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)

    if current_user.id != review.user_id:
        return jsonify({'message': 'Unauthorized user'}), 403

    if not review:
        return jsonify({'message': 'Review not found'}), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': 'Review deleted successfully'}), 200


# Update a Review ==========================================
@review_routes.route('/<int:reviewId>', methods=['PATCH'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return jsonify({'message': 'Review not found'}), 404

    if current_user.id != review.user_id:
        return jsonify({'message': 'Unauthorized user'}), 403

    form = CreateReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    """
        uncomment the below line and fix indentation for front-end
    """
    # if form.validate_on_submit():
    data = form.data

    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    if 'comment' in data:
        review.comment = data['comment']

    if 'rating' in data:
        review.rating = data['rating']

    db.session.commit()
    return jsonify({'message': 'Review updated successfully'}), 200
