from crypt import methods
from os import error
from flask import Blueprint, jsonify, request
from app.models import db, Product, Category
from flask_login import current_user, login_required
from app.forms import CreateProduct


product_routes = Blueprint('products', __name__)


def to_dict_product(product):
    """
    Converts a product object to a dictionary
    """
    return {
        "id": product.id,
        "owner_id": product.owner_id,
        "category_id": product.category_id,
        "name": product.name,
        "price": float(product.price),
        "description": product.description,
        "category": product.category,
        "quantity_available": int(product.quantity_available),
    }


@product_routes.route('/')
def get_all_products():
    """
    Query for all products and returns them in a list of products dictionaries
    """
    products_query = Product.query.all()

    if not products_query:
        return jsonify({'message': 'No products found'}), 404

    products_list = [to_dict_product(product) for product in products_query]

    return jsonify(products_list)


@product_routes.route('/<int:productId>')
def get_product(productId):
    query_product = Product.query.get(productId)

    if not query_product:
        return jsonify({"message": "Couldn't find a Product with the specified id"}), 404

    return jsonify(to_dict_product(query_product))


@product_routes.route("/users/<int:userId>")
def get_product_by_user_id(userId):
    if current_user.id == userId:
        user_products = Product.query.filter(Product.owner_id == userId).all()
        products = [to_dict_product(product) for product in user_products]
        return jsonify(products)

    return jsonify({'errors': 'Not authorized user, must be the owner to see your products'}), 401


# Create new product
@product_routes.route('/add_product', methods=["POST"])
def create_new_product():

    form = CreateProduct()
    form['csrf_token'].data = request.cookies['csrf_token']

    """
        uncomment the below line and fix indentation for front-end
    """
    # if form.validate_on_submit():
    data = form.data

    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    category = Category.query.filter(
        Category.name == data['category']).first()

    new_product = Product(
        owner_id=current_user.id,
        category_id=category.id,
        name=data['name'],
        price=data['price'],
        description=data['description'],
        category=data['category'],
        quantity_available=data.get('quantity_available', 0)
    )

    # Add new product to the database
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully', 'product_id': new_product.id}), 201


# Delete a product
@product_routes.route('/product/<int:productId>', methods=['DELETE'])
@login_required
def delete_product(productId):
    product = Product.query.get(productId)

    if current_user != product.owner_id:
        return jsonify({'message': 'Unauthorized user'}), 403

    if not product:
        return jsonify({'message': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'}), 200
