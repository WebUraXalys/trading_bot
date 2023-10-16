use std::convert::From;
use binance::model::KlineEvent;

use crate::candlestore::CandleStore;

#[derive(Debug, Default, Clone, Copy)]
pub struct FibRetr {
    pub fib0: f64,
    pub fib0236: f64,
    pub fib0382: f64,
    pub fib05: f64,
    pub fib0618: f64,
    pub fib1: f64,
    pub fib1618: f64,
    pub fib2: f64
}

impl From<& Vec<KlineEvent>> for FibRetr {
    fn from(value: & Vec<KlineEvent>) -> Self {
        let low = value.first().unwrap().kline.low.parse::<f64>().unwrap();
        let highs: Vec<f64> = value.iter().map(|k| k.kline.high.parse::<f64>().unwrap()).collect();
        let high = *highs.iter().max_by(|&a, &b| a.total_cmp(b)).unwrap();
        println!("GRAPH MAX: {}", high);
        
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
