from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
import csv


def seed_products():
    with open("app/seeds/products.csv", mode="r") as csv_file:
        csv_reader = csv.reader(csv_file)
        for product_row in csv_reader:
            product = Product(
                owner_id=int(product_row[0]),
                category_id=int(product_row[1]),
                name=product_row[2],
                price=float(product_row[3]),
                description=product_row[4],
                category=product_row[5],
                quantity_available=int(product_row[6])
            )
            db.session.add(product)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
