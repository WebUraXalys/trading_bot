import time
import json
from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi import HTTPException
from binance.client import Client
from binance.exceptions import BinanceAPIException
from back.dto.user import User
from back.db import models
from back.auth.authentication import JWTBearer

router = APIRouter(prefix="/exchange", tags=['exchange operations'])


class NoPingClient(Client):
    def ping(self):
        return None


@router.get('/info')
async def get_pairs(user: Annotated[User, Depends(JWTBearer())]):
    cm_futures_client = await api_authorise(login=user.login)
    start = time.time()
    exchange = cm_futures_client.futures_exchange_info()
    print(f"Exchange info: {time.time() - start}")
    data = []
    for pair in exchange['symbols']:
        data.append(pair)
    print(f"Get Pairs: {time.time() - start}")
    return {"data": data}


@router.get('/pair_info')
async def get_pair_klines(symbol: str, interval: str, user: Annotated[User, Depends(JWTBearer())]):
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
    return cm_futures_client.futures_klines(symbol=symbol, interval=interval, limit=3)


@router.get('/position_status')
async def get_position(symbol: str, user: Annotated[User, Depends(JWTBearer())]):
    client = await api_authorise(user.login)  # Authentication
    return client.futures_position_information(symbol=symbol)


@router.get('/set_margin')
async def set_margin(symbol: str, margin_type: str, user: Annotated[User, Depends(JWTBearer())]):
    """

    :param user:
    :param symbol: for example BNBUSDT
    :param margin_type: ISOLATED or CROSSED
    """

    client = await api_authorise(user.login)  # Authentication
    try:
        # Setting margin type ISOLATED or CROSSED
        client.futures_change_margin_type(symbol=symbol, marginType=margin_type)
    except BinanceAPIException as e:
        return e


@router.get('/set_leverage')
async def set_leverage(user: Annotated[User, Depends(JWTBearer())], symbol: str, leverage: int):
    """

    :param user:
    :param symbol: for example BNBUSDT
    :param leverage: integer x1-x100
    """
    client = await api_authorise(user.login)  # Authentication
    client.futures_change_leverage(symbol=symbol, leverage=leverage)  # Setting leverage


@router.get('/new_order')
async def create_order(user: Annotated[User, Depends(JWTBearer())], symbol: str, side: str, type: str, quantity: float, timeInForce: str | None = None, price: float | None = None):
    """

    :param side: BUY or SELL
    :param type: LIMIT or MARKET
    :param quantity:
    :param timeInForce: GTC, IOC or FOK
    :param price:
    :param user:
    :return: data about order
    """
    login = user.login
    client = await api_authorise(login)  # Authentication

    quantity, price = await get_precision(login, type, quantity, price, symbol)

    return client.futures_create_order(symbol=symbol,
                                       side=side,
                                       type=type,
                                       quantity=quantity,
                                       timeInForce=timeInForce,
                                       price=price)


async def get_precision(login, type, quantity, price, symbol):
    # Default values
    price_precision = 8
    quantity_precision = 8

    client = await api_authorise(login=login)  # Authentication

    for pair in client.futures_exchange_info()["symbols"]:
        if pair['symbol'] == symbol:
            price_precision = pair["pricePrecision"]
            quantity_precision = pair["baseAssetPrecision"]
            break

    quantity = float(round(quantity, price_precision))
    if type == "LIMIT":
        price = float(round(price, quantity_precision))
    return quantity, price


async def set_precision(login, type, quantity, price, symbol):
    # Default values
    price_precision = 8
    quantity_precision = 8

    client = await api_authorise(login=login)  # Authentication

    for pair in client.futures_exchange_info()["symbols"]:
        if pair['symbol'] == symbol:
            price_precision = pair["pricePrecision"]
            quantity_precision = pair["baseAssetPrecision"]
            break

    quantity = float(round(quantity, price_precision))
    if type == "LIMIT":
        price = float(round(price, quantity_precision))
    return quantity, price


async def api_authorise(login):
    user = models.User.get(login=login)
    try:
        params = models.UserSettings.get(user=user.id)
        client = NoPingClient(api_key=params.api_key, api_secret=params.secret_key, testnet=True)
    except:
        raise HTTPException(403, detail="Failed to authorise in Binance API")
    return client
