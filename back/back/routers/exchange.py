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
    """ :return list of lists. Data is ordered in such way:
    [
      [
        1591258320000,          // Open time
        "9640.7",               // Open price
        "9642.4",               // High price
        "9640.6",               // Low price
        "9642.0",               // Close (or latest price)
        "206",                  // Volume
        1591258379999,          // Close time
        "2.13660389",           // Base asset volume
        48,                     // Number of trades
        "119",                  // Taker buy volume
        "1.23424865",           // Taker buy base asset volume
        "0"                     // Ignore.
      ]
    ]"""
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
