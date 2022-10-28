from flask import render_template, jsonify, make_response
from app import app
import unidecode

from app.models.form import LoginForm
from app.controllers.firebase import Temas, Nomes, temas

@app.route("/", methods=["GET", "POST"])
def login():
  
  form = LoginForm()

  name = None
  last_name = None

  if form.validate_on_submit():
    name = form.name.data
    last_name = form.last_name.data

  user_name = unidecode.unidecode(f"{name}_{last_name}")
  url_tema = f"/{user_name}"

  return render_template('login.html', form=form, url_tema=url_tema)




@app.route('/tema/<user>')
def tema(user):

  return render_template('tema.html', temas=Temas, nomes=Nomes, user=user)


@app.route('/tema/api/<tema>', methods=['GET'])
def api_tema(tema):

  for item in Temas:
    if item['tema'] == tema:
      return make_response(
        jsonify(item)
      )


@app.route('/game/<user>/<tema>')
def game(tema, user):

  return render_template('game.html')