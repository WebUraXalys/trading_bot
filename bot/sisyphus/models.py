from concurrent.futures import Executor
from pydantic import BaseModel, Field
from typing import List
from pydantic.functional_validators import AfterValidator
from bot.sisyphus.executor import AwaitingImpulse


class Kline(BaseModel):
    start_time: int = Field(alias="t")
    end_time: int = Field(alias="T")
    open_price: float = Field(alias="o")
    close_price: float = Field(alias="c")
    high_price: float = Field(alias="h")
    low_price: float = Field(alias="l")
    kline_finished: bool = Field(alias="x", exclude=True, repr=False, default=True)


class KlineInfo(BaseModel):
    symbol: str = Field(alias="s")
    interval: str = Field(alias="i")

class ExecutionResult(BaseModel):
    new_executable: Executor | None = None
    new_klines_sequence: List[Kline] | None = None
    execute_immediately: bool = False
