use crate::{candlestore::CandleStore, candles, fib::{FibRetr, self}};
use log::{error, info, warn};
use chrono::prelude::*;


pub fn run_bot_worker(klines: &mut CandleStore) {
    let candles = &klines.candles;
    if candles.len() > 1 {
        println!("CANDLES_TOTAL = {:?};", candles.len());
        candles.iter().for_each(|c| println!("OPEN TIME: {}; CLOSE TIME: {}", NaiveDateTime::from_timestamp_opt(c.kline.open_time/1000, 0).unwrap(), NaiveDateTime::from_timestamp_opt(c.kline.close_time/1000, 0).unwrap()));
        print!("\n");
        let first_kline = &candles.first().unwrap().kline;
        let half_of_first_kline = (first_kline.high.parse::<f64>().unwrap() - first_kline.low.parse::<f64>().unwrap())*0.5 + first_kline.low.parse::<f64>().unwrap();
        if candles[1].kline.high.parse::<f64>().unwrap() > first_kline.high.parse::<f64>().unwrap() { // first step c.2.h > c.1.h    if candles.last().unwrap().kline.high.parse::<f64>().unwrap() > candles.ПЕРЕД-ОСТАННІЙ().unwrap().kline.high.parse::<f64>().unwrap()
            let fibon = FibRetr::from(candles);
            
            if candles.last().unwrap().kline.low.parse::<f64>().unwrap() < fibon.fib05 {
                info!("End of the impulse, low of #{} candle LOW: {}", candles.len(), candles.last().unwrap().kline.low);
                return klines.restore_first_candle()
            }
            else {
                info!("First step done, new impulse, first candle LOW: {}", first_kline.low);
                candles.iter().enumerate().for_each(|(num, candle)| {info!("Candle #{} ({}) HIGH: {} ", num, NaiveDateTime::from_timestamp_opt(candle.kline.open_time/1000, 0).unwrap(), candle.kline.high)});
                println!("{:?}", fibon);
            }
        } else {
            klines.restore_first_candle()
        }
    }
}


 //info!("{:?}", candles);