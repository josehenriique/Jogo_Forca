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