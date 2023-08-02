from peewee import *
from back.db.db import db


class Base(Model):
    class Meta:
        database = db


class User(Base):
    login = CharField()
    hashed_password = CharField()
