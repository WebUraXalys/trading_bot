from bot.sisyphus.models import ExecutionResult, Kline
from typing import List

from bot.sisyphus.util import calculate_kline_half


class Executable:
    def execute(self, klines: List[Kline]) -> ExecutionResult:
        return ExecutionResult(new_executable=None, new_klines_sequence=None, execute_immediately=False)

class Sequencer:
    klines: List[Kline] = []
    current_executable: Executable = None

    def __init__(self, executable: Executable):
        self.current_executable = executable
    
    def run_execution(self):
        ex = self.current_executable
        result = ex.execute(self.klines)
        if result.new_executable:
            self.current_executable = result.new_executable
        if result.new_klines_sequence:
            self.klines = result.new_klines_sequence
        if result.execute_immediately:
            self.run_execution()

    def input_kline(self, kline: Kline):
        self.klines.append(kline)
        self.run_execution()


class AwaitingImpulse(Executable):
    def high_of_first_is_greater_than_high_of_current(klines: List[Kline]) -> bool:
        return klines[0].high_price > klines[-1].high_price
    
    def low_of_current_is_greater_than_half_of_first(klines: List[Kline]):
        return klines[-1].low_price > calculate_kline_half(klines[0])

    def execute(self, klines: List[Kline]):
        if len(klines) >= 2:
            if self.high_of_first_is_greater_than_high_of_current():
                if self.low_of_current_is_greater_than_half_of_first():
                    return ExecutionResult(new_executable=ValidatingImpulse(), new_klines_sequence=None, execute_immediately=True)
        return ExecutionResult(new_executable=None, new_klines_sequence=[klines[-1]], execute_immediately=False)


class ValidatingImpulse(Executable):
    def execute(self, klines: List[Kline]) -> ExecutionResult:
        imulse_price = klines[-1].high_price - klines[-1].low_price
        impulse_percent = imulse_price / klines[-1].low_price
        if impulse_percent > 0.95:
            return ExecutionResult(new_executable=AwaitingImpulse(), new_klines_sequence=None, execute_immediately=False)
        else:
            return ExecutionResult(new_executable=AwaitingImpulse(), new_klines_sequence=None, execute_immediately=True)

class SuccesfulImpulse(Executable):
    pass