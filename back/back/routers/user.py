from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi import HTTPException
from back.dto.user import User
from back.db import models
from back.auth.authentication import JWTBearer

router = APIRouter(prefix="/user", tags=['user operations'])


@router.post('/settings')
async def set_settings(user: Annotated[User, Depends(JWTBearer())], api_key: str | None = None, secret_key: str | None = None, ):
    user = models.User.get(login=user.login)
    user_settings, created = models.UserSettings.get_or_create(user=user.id)
    user_settings.api_key = api_key
    user_settings.secret_key = secret_key
    user_settings.save()
    return {"created": created}


@router.get('/settings')
async def get_settings(user: Annotated[User, Depends(JWTBearer())]):
    user = models.User.get(login=user.login)
    try:
        params = models.UserSettings.get(user=user.id)
        return {"api_key": params.api_key,
                "secret_key": params.secret_key}
    except:
        raise HTTPException(403, detail="No matching settings for user")
