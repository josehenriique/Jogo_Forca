from flask import render_template
from app import app, db
import requests
import json

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
  url_tema = f"/{user_name}"

  return render_template('login.html', form=form, url_game=url_tema)

@app.route('/tema/<user>')
def tema(user):

  link = "https://temas-forca-default-rtdb.firebaseio.com/Temas"

  #Capturar os temas

  requisicao = requests.get(f'{link}/.json')
  print(requisicao)
  lista_temas = requisicao.json()

  temas = []
  palavras_tema = []
  nome = []


  for id_tema in lista_temas:
    temas.append(lista_temas[id_tema]['tema'])
    palavras = lista_temas[id_tema]['palavras']
    
    for p in palavras:
      nome.append(palavras[p]['nome'])
    
    palavras_tema.append(nome)
  
  print(temas)
  print(palavras_tema)

  return render_template('tema.html', temas=temas, palavras_tema=palavras_tema, user=user)


@app.route('/game/<tema>/<user>')
def game(tema, user):

  return render_template('game.html')