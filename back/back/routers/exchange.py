from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi import HTTPException
from binance.client import Client
from binance.exceptions import BinanceAPIException
from back.dto.user import User
from back.db import models
from back.auth.authentication import JWTBearer

router = APIRouter(prefix="/exchange", tags=['exchange operations'])


@router.get('/info')
async def get_pairs(user: Annotated[User, Depends(JWTBearer())]):
    cm_futures_client = await api_authorise(login=user.login)
    exchange = cm_futures_client.futures_exchange_info()
    data = []
    for pair in exchange['symbols']:
        data.append(pair)
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


@router.get('/new_order')
async def create_order(user: Annotated[User, Depends(JWTBearer())], leverage: int, margin_type: str, symbol: str, side: str, type: str, quantity: float, timeInForce: str | None = None, price: float | None = None):
    """
    :param symbol: for example BNBUSDT
    :param side: BUY or SELL
    :param type: LIMIT or MARKET
    :param quantity:
    :param timeInForce: GTC, IOC or FOK
    :param price:
    :param leverage: integer x1-x100
    :param margin_type: ISOLATED or CROSSED
    :param user:
    :return: data about order
    """
    login = user.login
    client = await api_authorise(login)  # Authentication

    quantity, price = await set_precision(login, type, quantity, price, symbol)

    client.futures_change_leverage(symbol=symbol, leverage=leverage)  # Setting leverage

    try:
        client.futures_change_margin_type(symbol=symbol, marginType=margin_type)  # Setting margin type ISOLATED or CROSSED
    except BinanceAPIException as e:
        print(e)

    order = client.futures_create_order(symbol=symbol,
                                        side=side,
                                        type=type,
                                        quantity=quantity,
                                        timeInForce=timeInForce,
                                        price=price)
    return order


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
        client = Client(api_key=params.api_key, api_secret=params.secret_key, testnet=True)
        return client
    except:
        raise HTTPException(403, detail="Failed to authorise in Binance API")
