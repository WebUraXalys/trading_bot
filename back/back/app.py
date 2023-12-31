from fastapi import FastAPI
from back.db.db import db
from back.db import models
from back.routers.auth import router as auth_router
from back.routers.user import router as user_router
from back.routers.exchange import router as exchange_router

def create_tables():
    with db:
        db.create_tables([models.User, models.UserSettings])


db.connect()
create_tables()
db.close()

app = FastAPI()

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(exchange_router)
