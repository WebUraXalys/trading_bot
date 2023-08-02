from fastapi import FastAPI
from back.back.routers.auth import router as auth_router

app = FastAPI()

app.include_router(auth_router)
