from os import name
from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from app.models import Review


class CreateReview(FlaskForm):
    comment = TextAreaField('comment', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    submit = SubmitField('submit')
