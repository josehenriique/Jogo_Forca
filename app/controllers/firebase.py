from flask import jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('C:/Users/joseh/Documentos/Programming/Colégio/Forca/app/controllers/temas-forca-firebase-adminsdk-8bsr7-281203d38e.json')

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