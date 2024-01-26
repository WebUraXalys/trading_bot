from models import Kline


def calculate_kline_half(kline: Kline):
    return (0.5*(kline.high_price - kline.low_price)) + kline.low_price
