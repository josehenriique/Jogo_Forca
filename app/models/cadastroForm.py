from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CadastroForm(FlaskForm):
  tema = StringField('tema', validators=[DataRequired()])
  
  palavra_1 = StringField('palavra_1', validators=[DataRequired()])
  dica_1 = StringField('dica_1', validators=[DataRequired()])
  conceito_1 = StringField('conceito_1', validators=[DataRequired()])

  palavra_2 = StringField('palavra_2', validators=[DataRequired()])
  dica_2 = StringField('dica_2', validators=[DataRequired()])
  conceito_2 = StringField('conceito_2', validators=[DataRequired()])

  palavra_3 = StringField('palavra_3', validators=[DataRequired()])
  dica_3 = StringField('dica_3', validators=[DataRequired()])
  conceito_3 = StringField('conceito_3', validators=[DataRequired()])

  palavra_4 = StringField('palavra_4', validators=[DataRequired()])
  dica_4 = StringField('dica_4', validators=[DataRequired()])
  conceito_4 = StringField('conceito_4', validators=[DataRequired()])

  palavra_5 = StringField('palavra_5', validators=[DataRequired()])
  dica_5 = StringField('dica_5', validators=[DataRequired()])
  conceito_5 = StringField('conceito_5', validators=[DataRequired()])

  palavra_6 = StringField('palavra_6', validators=[DataRequired()])
  dica_6 = StringField('dica_6', validators=[DataRequired()])
  conceito_6 = StringField('conceito_6', validators=[DataRequired()])

  palavra_7 = StringField('palavra_7', validators=[DataRequired()])
  dica_7 = StringField('dica_7', validators=[DataRequired()])
  conceito_7 = StringField('conceito_7', validators=[DataRequired()])

  palavra_8 = StringField('palavra_8', validators=[DataRequired()])
  dica_8 = StringField('dica_8', validators=[DataRequired()])
  conceito_8 = StringField('conceito_8', validators=[DataRequired()])

  palavra_9 = StringField('palavra_9', validators=[DataRequired()])
  dica_9 = StringField('dica_9', validators=[DataRequired()])
  conceito_9 = StringField('conceito_9', validators=[DataRequired()])

  palavra_10 = StringField('palavra_10', validators=[DataRequired()])
  dica_10 = StringField('dica_10', validators=[DataRequired()])
  conceito_10 = StringField('conceito_10', validators=[DataRequired()])

  palavra_11 = StringField('palavra_11', validators=[DataRequired()])
  dica_11 = StringField('dica_11', validators=[DataRequired()])
  conceito_11 = StringField('conceito_11', validators=[DataRequired()])

  palavra_12 = StringField('palavra_12', validators=[DataRequired()])
  dica_12 = StringField('dica_12', validators=[DataRequired()])
  conceito_12 = StringField('conceito_12', validators=[DataRequired()])
  