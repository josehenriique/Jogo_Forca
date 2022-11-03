from flask import render_template, jsonify, make_response
from app import app
import unidecode

from app.models.form import LoginForm
from app.models.cadastroForm import CadastroForm
from app.controllers.logic_firebase import db

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

  # Cadastro de usuários

  users_ref = db.collection(u'users')
  docs_user = users_ref.stream()

  def docsUser():
    docs = []

    for doc in docs_user:
      docs.append(doc.to_dict())
    
    return docs

  def userName(users):
    users_name = []

    for user in users:
      users_name.append(user['user'])
    
    return users_name

  Users = docsUser()
  NameUsers = userName(Users)

  def cadastroUser():

    data = {
        u'user': u'{}'.format(user_name),
        u'score': 0
      }

    for item in NameUsers:
        has_user = True

        if item == user_name:
          has_user = True
          break
        else:
          has_user = False
        
        if has_user == False:
          db.collection(u'users').document(u'{}'.format(user_name)).set(data)

  cadastroUser()

  return render_template('login.html', form=form, url_tema=url_tema)


@app.route('/tema/<user>')
def tema(user):

  temas_ref = db.collection(u'temas')
  docs = temas_ref.stream()

  def temas():
    temas = []

    for doc in docs:
      temas.append(doc.to_dict())

    return temas

  def nome_temas(temas):
    nomes = []

    for item in temas:
      nomes.append(item['tema'])

    return nomes


  Temas = temas()
  Nomes = nome_temas(Temas)

  return render_template('tema.html', temas=Temas, nomes=Nomes, user=user)


@app.route('/tema/api/<tema>', methods=['GET'])
def api_tema(tema):

  temas_ref = db.collection(u'temas')
  docs = temas_ref.stream()

  def temas():
    temas = []

    for doc in docs:
      temas.append(doc.to_dict())

    return temas

  Temas = temas()

  for item in Temas:
    if item['tema'] == tema:
      return make_response(
        jsonify(item)
      )


@app.route('/game/<user>/<tema>')
def game(tema, user):

  return render_template('game.html', user=user)


@app.route('/cadastro/<user>', methods=['GET', 'POST'])
def cadastro(user):

  form = CadastroForm()

  data = None

  if form.validate_on_submit():
    data = {
      u'tema': u'{}'.format(form.tema.data),
      u'palavras': {
        u'1':{
          u'nome': u'{}'.format(form.palavra_1.data),
          u'dica': u'{}'.format(form.dica_1.data),
          u'conceito': u'{}'.format(form.conceito_1.data)
        },
        u'2':{
          u'nome': u'{}'.format(form.palavra_2.data),
          u'dica': u'{}'.format(form.dica_2.data),
          u'conceito': u'{}'.format(form.conceito_2.data)
        },
        u'3':{
          u'nome': u'{}'.format(form.palavra_3.data),
          u'dica': u'{}'.format(form.dica_3.data),
          u'conceito': u'{}'.format(form.conceito_3.data)
        },
        u'4':{
          u'nome': u'{}'.format(form.palavra_4.data),
          u'dica': u'{}'.format(form.dica_4.data),
          u'conceito': u'{}'.format(form.conceito_4.data)
        },
        u'5':{
          u'nome': u'{}'.format(form.palavra_5.data),
          u'dica': u'{}'.format(form.dica_5.data),
          u'conceito': u'{}'.format(form.conceito_5.data)
        },
        u'6':{
          u'nome': u'{}'.format(form.palavra_6.data),
          u'dica': u'{}'.format(form.dica_6.data),
          u'conceito': u'{}'.format(form.conceito_6.data)
        },
        u'7':{
          u'nome': u'{}'.format(form.palavra_7.data),
          u'dica': u'{}'.format(form.dica_7.data),
          u'conceito': u'{}'.format(form.conceito_7.data)
        },
        u'8':{
          u'nome': u'{}'.format(form.palavra_8.data),
          u'dica': u'{}'.format(form.dica_8.data),
          u'conceito': u'{}'.format(form.conceito_8.data)
        },
        u'9':{
          u'nome': u'{}'.format(form.palavra_9.data),
          u'dica': u'{}'.format(form.dica_9.data),
          u'conceito': u'{}'.format(form.conceito_9.data)
        },
        u'10':{
          u'nome': u'{}'.format(form.palavra_10.data),
          u'dica': u'{}'.format(form.dica_10.data),
          u'conceito': u'{}'.format(form.conceito_10.data)
        },
        u'11':{
          u'nome': u'{}'.format(form.palavra_11.data),
          u'dica': u'{}'.format(form.dica_11.data),
          u'conceito': u'{}'.format(form.conceito_11.data)
        },
        u'12':{
          u'nome': u'{}'.format(form.palavra_12.data),
          u'dica': u'{}'.format(form.dica_12.data),
          u'conceito': u'{}'.format(form.conceito_12.data)
        },
      }
    }

    db.collection(u'temas').document().set(data)

  

  return render_template('cadastro.html', form=form, user=user)