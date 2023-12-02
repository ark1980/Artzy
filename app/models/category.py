from .db import db, environment, SCHEMA, add_prefix_for_prod


class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    # Relationship
    products = db.relationship('Product', backref='category_name', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
