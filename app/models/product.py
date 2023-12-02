from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('categories.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50))
    quantity_available = db.Column(db.Integer)

    # Relationships
    # images = db.relationship('ProductImage', backref='product', lazy=True)
    reviews = db.relationship('Review', backref='product', lazy=True)
    # wishlist_items = db.relationship(
    #     'WishlistProduct', backref='product', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'category_id': self.category_id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'quantity_available': self.quantity_available
        }
