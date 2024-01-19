import time
from typing import List
from binance import ThreadedWebsocketManager
from settings import SETTINGS
from models import Kline, KlineInfo

api_key = SETTINGS.BINANCE_API_KEY
api_secret = SETTINGS.BINANCE_API_SECRET
# print(api_key, api_secret)

KLINES: List[Kline] = []
KLINEINFO = None

def handle_socket_message(msg):
    gettime = int(time.time())
    k = msg["k"]
    if k["x"]:
        if KLINEINFO is None:
            KLINEINFO = KlineInfo(symbol=msg['s'], interval=k['i'])
        kline = Kline.model_validate(k)
        print(kline)
        KLINES.append(kline)
        print(KLINEINFO, KLINES)
    else:
        # TTK - Time To Kline
        print("\rTTK:", (int(str(k["T"])[:-3])-gettime)+8, end="")


def main():

    symbol = 'BTCUSDT'

    twm = ThreadedWebsocketManager(api_key=api_key, api_secret=api_secret, testnet=True)
    # start is required to initialise its internal loop
    twm.start()

    twm.start_kline_socket(callback=handle_socket_message, symbol=symbol)

    # multiple sockets can be started
    # twm.start_depth_socket(callback=handle_socket_message, symbol=symbol)

    # or a multiplex socket can be started like this
    # see Binance docs for stream names
    # streams = ['bnbbtc@miniTicker', 'bnbbtc@bookTicker']
    # twm.start_multiplex_socket(callback=handle_socket_message, streams=streams)

    twm.join()


if __name__ == "__main__":
   main()