from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  last_name = StringField('last_name', validators=[DataRequired()])