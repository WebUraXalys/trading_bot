from pydantic import BaseModel, Field
from typing import Annotated
from pydantic.functional_validators import AfterValidator


class Kline(BaseModel):
    start_time: int = Field(alias="t")
    end_time: int = Field(alias="T")
    open_price: str = Field(alias="o")
    close_price: str = Field(alias="c")
    high_price: str = Field(alias="h")
    low_price: str = Field(alias="l")
    kline_finished: bool = Field(alias="x")


class KlineInfo(BaseModel):
    symbol: str = Field(alias="s")
    interval: str = Field(alias="i")
