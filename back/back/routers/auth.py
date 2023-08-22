import jwt
import datetime
from fastapi import APIRouter
import argon2
from fastapi import HTTPException
from back.db import models
from back.settings import settings

router = APIRouter(prefix="/auth", tags=['authentication'])


@router.post('/signin')
def signin(login: str, password: str):
    try:
        user = models.User.get(login=login)
    except Exception as e:
        print(e)
        raise HTTPException(404, detail="User not found")
    if argon2.verify_password(bytes(user.hashed_password, 'utf-8'), bytes(password, 'utf-8')):
        token = {"id": user.id, "login": login, "exp": datetime.datetime.now() + datetime.timedelta(hours=2)}
        secret = settings.SECRET
        return {"key": jwt.encode(token, secret, algorithm="HS256")}
    else:
        raise HTTPException(403, detail="Wrong password")


@router.get('/dec')
def dec(token: str):
    secret = settings.SECRET
    decoded_token = jwt.decode(token, secret, algorithms=["HS256"])
    print(decoded_token)
    return decoded_token


@router.post('/signup')
def signup(login: str, password: str):
    hashed_password = argon2.hash_password(bytes(password, 'utf-8'))
    user, created = models.User.get_or_create(login=login, hashed_password=hashed_password)
    return created
