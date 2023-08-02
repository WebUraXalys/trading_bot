from fastapi import FastAPI
from back.back.db.db import db
from back.back.db import models
from back.back.routers.auth import router as auth_router

db.connect()
db.create_tables([models.User])
db.close()

app = FastAPI()

app.include_router(auth_router)
