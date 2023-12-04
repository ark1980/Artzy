from os import name
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, FloatField, TextAreaField, SubmitField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from app.models import Product


class CreateProduct(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    category = SelectField('category', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    quantity_available = IntegerField(
        'Available Quantity', validators=[DataRequired()])
    submit = SubmitField('submit')
