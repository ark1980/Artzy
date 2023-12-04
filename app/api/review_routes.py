from crypt import methods
from email import message
from os import error
from flask import Blueprint, jsonify, request
from app.models import db, Product, Category, Review, review
from flask_login import current_user, login_required
from app.forms import CreateProduct


review_routes = Blueprint('reviews', __name__)


# Get all Reviews by a Produtc's id
@review_routes.route('/<int:productId>')
def get_reviews_by_product_id(productId):
    reviews = Review.query.filter(Review.product_id == productId).all()

    if not reviews:
        return jsonify({"message": "The productd does not have review yet"}), 404

    product_reviews = [review.to_dict() for review in reviews]

    return jsonify(product_reviews)


# Get all Reviews of the Current User
@review_routes.route('/user/<int:userId>')
def get_reviews_by_user_id(userId):

    if current_user.id == userId:
        reviews = Review.query.filter(Review.user_id == userId).all()

        if not reviews:
            return jsonify({"message": "The productd does not have review yet"}), 404

        user_reviews = [review.to_dict() for review in reviews]
        return jsonify(user_reviews)

    return jsonify({'message': 'Unauthorized user'}), 403
