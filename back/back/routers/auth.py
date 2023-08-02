from fastapi import APIRouter
import jwt
import datetime
from back.back.settings import settings

router = APIRouter(prefix="/auth", tags=['authentification'])


@router.get('/signup')
def signup():
    secret = settings.SECRET
    token = {"exp": datetime.datetime.now() + datetime.timedelta(hours=1)}
    encoded_token = jwt.encode(token, secret, algorithm="HS256")
    return encoded_token


@router.get('/signin')
def signup(token: str):
    return "signin"
    # decoded_token = jwt.decode(token, "secret", algorithms=["HS256"])
    # return decoded_token
