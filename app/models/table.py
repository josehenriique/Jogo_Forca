from flask_sqlalchemy import Model
from app import db

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  score = db.Column(db.Integer)

  def __init__(self, name, score):
    self.name = name
    self.score = score

  def __repr__(self):
    return "<User %r>" % self.name
  