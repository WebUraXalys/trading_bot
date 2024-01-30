from models import ExecutionResult, Kline
from typing import List
from settings import SETTINGS
from operator import attrgetter


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
        print(result)
        if result.new_executable is not None:
            self.current_executable = result.new_executable
        if result.new_klines_sequence is not None:
            self.klines = result.new_klines_sequence
        if result.execute_immediately:
            self.run_execution()

    def input_kline(self, kline: Kline):
        self.klines.append(kline)
        print("Klines qty:", len(self.klines))
        self.run_execution()


class AwaitingImpulse(Executable):
    def high_of_first_is_greater_than_high_of_current(klines: List[Kline]) -> bool:
        return klines[-1].high_price > klines[0].high_price

    def low_of_current_is_greater_than_half_of_first(klines: List[Kline]) -> bool:
        return klines[-1].low_price > calculate_kline_half(klines[0])

    def execute(self, klines: List[Kline]):
        print("AWAITING IMPULSE")
        if len(klines) >= 3:
            if AwaitingImpulse.high_of_first_is_greater_than_high_of_current:
                if AwaitingImpulse.low_of_current_is_greater_than_half_of_first:
                    return ExecutionResult(new_executable=ValidatingImpulse(), new_klines_sequence=None, execute_immediately=True)
        else:
            return ExecutionResult(new_executable=None, new_klines_sequence=None, execute_immediately=False)
        return ExecutionResult(new_executable=None, new_klines_sequence=[klines[-1]], execute_immediately=False)


class ValidatingImpulse(Executable):
    def execute(self, klines: List[Kline]) -> ExecutionResult:
        print("VALIDATING IMPULSE")
        impulse_price = klines[-1].high_price - klines[-1].low_price
        impulse_percent = impulse_price / klines[-1].low_price
        if impulse_percent > SETTINGS.MIN_IMPULSE_PERCENT:
            return ExecutionResult(new_executable=SuccessfulImpulse(), new_klines_sequence=None,
                                   execute_immediately=True)
        else:
            return ExecutionResult(new_executable=AwaitingImpulse(), new_klines_sequence=None,
                                   execute_immediately=False)


class SuccessfulImpulse(Executable):
    def execute(self, klines: List[Kline]) -> ExecutionResult:
        print("SUCCESFUL IMPULSE")
        return super().execute(klines)


def high_price_of_kline(kline: Kline):
    return kline.high_price


def get_current_high_kline(klines: List[Kline]):
    return max(klines, key=high_price_of_kline)


class TrackedImpulse(Executable):
    current_high_kline = None

    def update_current_high_kline(self, klines: List[Kline]) -> bool:
        """
        Returns `True` if current high kline was updated, otherwise returns `False`
        """
        actual_current_high_kline = get_current_high_kline(klines)
        if self.current_high_kline != actual_current_high_kline:
            self.current_high_kline = actual_current_high_kline
            return True
        return False

    def __init__(self, current_high_kline=None) -> None:
        if current_high_kline is not None:
            self.current_high_kline = current_high_kline
        super().__init__()

    def execute(self, klines: List[Kline]) -> ExecutionResult:
        print("TRACKED IMPULSE")
        if update_current_high_kline(klines):
            return ExecutionResult(new_executable=GotNewHighInImpulse(), new_klines_sequence=None, execute_immediately=True)
        else:
            return ExecutionResult(new_executable=TrackedImpulse(current_high_kline=self.current_high_kline), new_klines_sequence=None, execute_immediately=False)


class GotNewHighInImpulse(Executable):
    def execute(self, klines: List[Kline]) -> ExecutionResult:
        return super().execute()
