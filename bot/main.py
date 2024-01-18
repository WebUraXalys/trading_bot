import time
import os
from binance import ThreadedWebsocketManager
from dotenv import load_dotenv
load_dotenv()

api_key = os.environ.get("API_KEY")
api_secret = os.environ.get("API_KEY_SECRET")
# print(api_key, api_secret)

KLINES = []
KLINEINFO = {

}

def handle_socket_message(msg):
    gettime = int(time.time())
    k = msg["k"]
    if k["x"]:
        if len(KLINEINFO) <= 0:
            KLINEINFO.update({
                "symbol": msg["s"],
                "interval": k["i"]
            })
        kline= {
            "start_time": k["t"],
            "end_time": k["T"],
            "open_price": k["o"],
            "close_price": k["c"],
            "high_price": k["h"],
            "low_price": k["l"],
            "kline_finished": k["x"]
        }
        KLINES.append(kline)
        print(KLINEINFO, KLINES)
    else:
        print("\rTTK:", (int(str(k["T"])[:10])-gettime)+8, end="")


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