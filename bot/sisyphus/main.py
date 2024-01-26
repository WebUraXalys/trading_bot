import time
from typing import List
from binance import ThreadedWebsocketManager
from settings import SETTINGS
from models import Kline

api_key = SETTINGS.BINANCE_API_KEY
api_secret = SETTINGS.BINANCE_API_SECRET
# print(api_key, api_secret)

KLINES: List[Kline] = []

def handle_socket_message(msg):
    gettime = int(time.time())
    k = msg["k"]
    if k["x"]:
        kline = Kline.model_validate(k)
        print("\n", kline)
        KLINES.append(kline)
        print("Klines qty:", len(KLINES))
    else:
        # TTK - Time To Kline
        print("\rTTK:", (int(str(k["T"])[:-3])-gettime)+8, end="")


def main():
    symbol = 'BTCUSDT'

    twm = ThreadedWebsocketManager(api_key=api_key, api_secret=api_secret, testnet=True)
    twm.start()

    twm.start_kline_socket(callback=handle_socket_message, symbol=symbol)

    twm.join()


if __name__ == "__main__":
   main()