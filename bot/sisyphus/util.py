from models import Kline, Fib


def calculate_kline_half(kline: Kline):
    return (0.5*(kline.high_price - kline.low_price)) + kline.low_price


def calculate_fib(low_kline: Kline, high_kline: Kline) -> Fib:
    low = low_kline.low_price
    high = high_kline.high_price
    diff = high - low

    f = Fib()
    f.fib0 = low
    f.fib0236 = low + (diff * 0.236)
    f.fib0382 = low + (diff * 0.382)
    f.fib05 = low + (diff * 0.5)
    f.fib0618 = low + (diff * 0.618)
    f.fib1 = high + (diff * 0.0)
    f.fib1618 = high + (diff * 0.618)
    f.fib2 = high + diff
    return f
