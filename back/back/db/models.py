from peewee import *
from back.db.db import db


class Base(Model):
    class Meta:
        database = db


class User(Base):
    login = CharField()
    hashed_password = CharField()


class UserSettings(Base):
    user = ForeignKeyField(User, on_delete='CASCADE')
    api_key = CharField(null=True)
    secret_key = CharField(null=True)


db.connect()
db.create_tables([UserSettings])
db.close()
