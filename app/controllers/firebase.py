import os.path
import firebase_admin
from flask import jsonify
from firebase_admin import credentials
from firebase_admin import firestore

basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)

# Use a service account.
cred = credentials.Certificate(f'{basedir}/temas-forca-firebase-adminsdk-8bsr7-281203d38e.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()


# get temas

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