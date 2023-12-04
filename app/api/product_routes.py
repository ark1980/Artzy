from os import error
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

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
        return jsonify({'message': 'product not found'}), 404
    
    return jsonify(to_dict_product(query_product))

    