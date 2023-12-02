from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
import csv


def seed_reviews():
    with open("app/seeds/reviews.csv", mode="r") as csv_file:
        csv_reader = csv.reader(csv_file)
        for review_row in csv_reader:
            review = Review(
                user_id=int(review_row[0]),
                product_id=int(review_row[1]),
                rating=int(review_row[2]),
                comment=review_row[3]
            )
            db.session.add(review)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
