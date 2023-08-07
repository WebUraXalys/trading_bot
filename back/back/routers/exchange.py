from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi import HTTPException
from binance.cm_futures import CMFutures
from back.dto.user import User, UserSettings
from back.db import models
from back.auth.authentication import JWTBearer

router = APIRouter(prefix="/exchange", tags=['exchange operations'])


@router.get('/info')
async def get_settings(user: Annotated[User, Depends(JWTBearer())]):
    user = models.User.get(login=user.login)
    try:
        params = models.UserSettings.get(user=user.id)
        cm_futures_client = CMFutures(key=params.api_key,
                                      secret=params.secret_key,
                                      base_url="https://testnet.binancefuture.com/")
        exchange = cm_futures_client.exchange_info()
        data = []
        for pair in exchange['symbols']:
            data.append(pair)
        return {"data": data}
    except:
        raise HTTPException(403, detail="No matching settings for user")
