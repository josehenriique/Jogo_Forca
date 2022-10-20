from flask import render_template
from app import app, db

from app.models.form import LoginForm

@app.route("/", methods=["GET", "POST"])
def login():
  
  form = LoginForm()

  name = None
  last_name = None

  if form.validate_on_submit():
    name = form.name.data
    last_name = form.last_name.data

  user_name = f"{name}_{last_name}"
  url_game = f"/{user_name}"

  return render_template('login.html', form=form, url_game=url_game)

@app.route('/game/<user>')
def game(user):

  return render_template('game.html')