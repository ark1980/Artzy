from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    clothing = Category(name="Clothing")
    Jewelry = Category(name="Jewelry")
    Home_and_living_items = Category(name="Home and living items")
    accessories = Category(name="Accessories")
    Crafts_and_supplies = Category(name="Crafts and supplies")
    electronics = Category(name="Electronics")
    arts = Category(name="Arts")
    Dev_stuff = Category(name="Dev stuff")

    db.session.add(clothing)
    db.session.add(Jewelry)
    db.session.add(Home_and_living_items)
    db.session.add(accessories)
    db.session.add(Crafts_and_supplies)
    db.session.add(electronics)
    db.session.add(arts)
    db.session.add(Dev_stuff)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
