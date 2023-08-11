from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi import HTTPException
from binance.cm_futures import CMFutures
from back.dto.user import User
from back.db import models
from back.auth.authentication import JWTBearer

router = APIRouter(prefix="/exchange", tags=['exchange operations'])


@router.get('/info')
async def get_settings(user: Annotated[User, Depends(JWTBearer())]):
    cm_futures_client = await api_authorise(login=user.login)
    exchange = cm_futures_client.exchange_info()
    data = []
    for pair in exchange['symbols']:
        data.append(pair)
    return {"data": data}


@router.get('/pair_info')
async def get_settings(symbol: str, interval: str, user: Annotated[User, Depends(JWTBearer())]):
    cm_futures_client = await api_authorise(login=user.login)
    return cm_futures_client.klines(symbol, interval, limit=3)


async def api_authorise(login):
    user = models.User.get(login=login)
    try:
        params = models.UserSettings.get(user=user.id)
        cm_futures_client = CMFutures(key=params.api_key, secret=params.secret_key, base_url="https://testnet.binancefuture.com/")
        return cm_futures_client
    except:
        raise HTTPException(403, detail="Failed to authorise in Binance API")
