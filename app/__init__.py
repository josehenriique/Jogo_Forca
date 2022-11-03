from flask import Flask

app = Flask(__name__)
app.config.from_object('config')

from app.models import form, cadastroForm
from app.controllers import default, logic_firebase