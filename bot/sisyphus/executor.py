from models import ExecutionResult, Kline
from typing import List
from settings import SETTINGS
from util import calculate_kline_half


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

# class TestSequencer(Sequencer):
#     predefined_klines=[Kline(start_time=1706560440000, end_time=1706560499999, open_price=43042.11, close_price=43044.7, high_price=43045.2, low_price=43032.15),
#     Kline(start_time=1706560440000, end_time=1706560499999, open_price=43042.11, close_price=43044.7, high_price=43045.2, low_price=43032.15),
#     Kline(start_time=1706560440000, end_time=1706560499999, open_price=43042.11, close_price=43044.7, high_price=43045.2, low_price=43032.15),
#     Kline(start_time=1706560440000, end_time=1706560499999, open_price=43042.11, close_price=43044.7, high_price=43045.2, low_price=43032.15)]


class AwaitingImpulse(Executable):
    def high_of_first_is_greater_than_high_of_current(klines: List[Kline]) -> bool:
        print("F1", klines[-1].high_price, klines[0].high_price)
        return klines[-1].high_price > klines[0].high_price
    
    def low_of_current_is_greater_than_half_of_first(klines: List[Kline]) -> bool:
        print("F2 ", klines[-1].low_price, calculate_kline_half(klines[0]))
        return klines[-1].low_price > calculate_kline_half(klines[0])

    def execute(self, klines: List[Kline]):
        # print(f"Awating impulse klines", klines)
        print("AWAITING IMPULSE")
        if len(klines) >= 2:
            print("if0")
            if AwaitingImpulse.high_of_first_is_greater_than_high_of_current(klines):
                print("if1")
                if AwaitingImpulse.low_of_current_is_greater_than_half_of_first(klines):
                    print("if2")
                    return ExecutionResult(new_executable=ValidatingImpulse(), new_klines_sequence=None, execute_immediately=True)
        else:
            return ExecutionResult(new_executable=None, new_klines_sequence=None, execute_immediately=False)
        return ExecutionResult(new_executable=None, new_klines_sequence=[klines[-1]], execute_immediately=False)


class ValidatingImpulse(Executable):
    def execute(self, klines: List[Kline]) -> ExecutionResult:
        print("VALIDATING IMPULSE")
        imulse_price = klines[-1].high_price - klines[-1].low_price
        impulse_percent = imulse_price / klines[-1].low_price
        if impulse_percent > SETTINGS.MIN_IMPULSE_PERCENT:
            return ExecutionResult(new_executable=SuccesfulImpulse(), new_klines_sequence=None, execute_immediately=True)
        else:
            return ExecutionResult(new_executable=AwaitingImpulse(), new_klines_sequence=None, execute_immediately=False)

class SuccesfulImpulse(Executable):
    def execute(self, klines: List[Kline]) -> ExecutionResult:
        print("SUCCESFUL IMPULSE")
        return super().execute(klines)