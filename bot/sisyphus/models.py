from concurrent.futures import Executor
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


class KlineInfo(BaseModel):
    symbol: str = Field(alias="s")
    interval: str = Field(alias="i")

class ExecutionResult():
    new_executable: Executor | None = None
    new_klines_sequence: List[Kline] | None = None
    execute_immediately: bool = False

    def __init__(self, **kwargs) -> None:
        ne = kwargs["new_executable"]
        if ne:
            self.new_executable = ne
        else:
            self.new_executable = None

        nks = kwargs["new_klines_sequence"]
        if nks:
            self.new_klines_sequence = nks
        else:
            self.new_klines_sequence = None

        ei = kwargs["execute_immediately"]
        if ei:
            self.execute_immediately = ei
        else:
            self.execute_immediately = False
    
    def __str__(self) -> str:
        result = ""
        if self.new_executable:
            result += f"New executable: {self.new_executable.__name__}\n"
        return result + f"New Klines seq.: {self.new_klines_sequence}\nExecute immediately: {self.execute_immediately}"
