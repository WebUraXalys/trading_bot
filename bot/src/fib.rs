use std::convert::From;
use crate::candlestore::CandleStore;

#[derive(Debug, Default, Clone, Copy)]
pub struct FibRetr {
    fib0: f64,
    fib0236: f64,
    fib0382: f64,
    fib05: f64,
    fib0618: f64,
    fib1: f64,
    fib1618: f64,
    fib2: f64
}

impl From<&mut CandleStore> for FibRetr {
    fn from(value: &mut CandleStore) -> Self {
        let low = value.candles.first().unwrap().kline.low.parse::<f64>().unwrap();
        let high = value.candles.last().unwrap().kline.high.parse::<f64>().unwrap();
        
        let diff = high - low;

        FibRetr {
            fib0: low,
            fib0236: low + (diff * 0.236),
            fib0382: low + (diff * 0.382),
            fib05: low + (diff * 0.5),
            fib0618: low + (diff * 0.618),
            fib1: high + (diff * 0.0),
            fib1618: high + (diff * 0.618),
            fib2: high + diff
        }
    }
}
