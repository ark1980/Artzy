from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="Demian",
        username='Demo2023', email='demo@aa.io', password='password')
    marnie = User(
        first_name="Marnie", last_name="Marnian",
        username='marnie2023', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name="Bobbie", last_name="Bobbian",
        username='bobbie2023', email='bobbie@aa.io', password='password')
    john = User(
        first_name="John", last_name="Smith",
        username='johny2023', email='johny@aa.io', password='password')
    megan = User(
        first_name="Megan", last_name="Watson",
        username='megan2023', email='megan@aa.io', password='password')
    sahar = User(
        first_name="Sahar", last_name="Jahed",
        username='sahar2023', email='sahar@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)
    db.session.add(megan)
    db.session.add(sahar)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
