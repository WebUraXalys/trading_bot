import jwt
from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi import HTTPException
from back.dto.user import User, UserSettings
from back.db import models
from back.settings import settings
from back.auth.authentication import JWTBearer

router = APIRouter(prefix="/user", tags=['user operations'])


@router.post('/settings')
async def set_settings(token: Annotated[User, Depends(JWTBearer())], params: UserSettings):
    user = models.User.get(login=token.login)
    user_settings, created = models.UserSettings.get_or_create(user=token.id)
    user_settings.api_key = params.api_key
    user_settings.secret_key = params.secret_key
    user_settings.save()

    token = {"id": user.id, "login": user.login, "exp": token.exp, "api_key": params.api_key,
             "secret_key": params.secret_key}
    secret = settings.SECRET
    return {"token": jwt.encode(token, secret, algorithm="HS256")}


@router.get('/settings')
async def get_settings(user: Annotated[User, Depends(JWTBearer())]):
    user = models.User.get(login=user.login)
    try:
        params = models.UserSettings.get(user=user.id)
        token = {"id": user.id, "login": user.login, "exp": user.exp, "api_key": params.api_key, "secret_key": params.secret_key}
        secret = settings.SECRET
        return {"token": jwt.encode(token, secret, algorithm="HS256")}
    except:
        raise HTTPException(403, detail="No matching settings for user")
