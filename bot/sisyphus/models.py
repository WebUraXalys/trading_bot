from pydantic import BaseModel, Field
from typing import List
from pydantic.functional_validators import AfterValidator


class Kline(BaseModel):
    start_time: int = Field(alias="t")
    end_time: int = Field(alias="T")
    open_price: float = Field(alias="o")
    close_price: float = Field(alias="c")
    high_price: float = Field(alias="h")
    low_price: float = Field(alias="l")
    kline_finished: bool = Field(alias="x", exclude=True, repr=False, default=True)

    def half(self):
        return (0.5 * (self.high_price - self.low_price)) + self.low_price


class KlineInfo(BaseModel):
    symbol: str = Field(alias="s")
    interval: str = Field(alias="i")

    def __str__(self) -> str:
        result = ""
        if self.new_executable:
            result += f"New executable: {self.new_executable.__class__.__name__}\n"
        return result + f"New Klines seq.: {self.new_klines_sequence}\nExecute immediately: {self.execute_immediately}"


class Fib(BaseModel):
    fib0: float = None
    fib0236: float = None
    fib0382: float = None
    fib05: float = None
    fib0618: float = None
    fib1: float = None
    fib1618: float = None
    fib2: float = None
