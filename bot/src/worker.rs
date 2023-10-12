use crate::{candlestore::CandleStore, candles, fib::{FibRetr, self}};
pub fn run_bot_worker(klines: &mut CandleStore) {
    let candles = &klines.candles;
    if candles.len() > 1 {
        println!("CANDLES_TOTAL = {:?}", candles.len());
        candles.iter().for_each(|c| println!("CLOSE TIME: {}; OPEN TIME: {}", c.kline.close_time, c.kline.open_time));
        print!("\n");
        let first_kline = &candles[0].kline;
        let half_of_first_kline = (first_kline.high.parse::<f64>().unwrap() - first_kline.low.parse::<f64>().unwrap())*0.5 + first_kline.low.parse::<f64>().unwrap();
        if candles[1].kline.high.parse::<f64>().unwrap() > first_kline.high.parse::<f64>().unwrap() {
            if candles[1].kline.low.parse::<f64>().unwrap() > half_of_first_kline {
               let fiboncasdafaswdf = FibRetr::from(klines);
               println!("{:?}", fiboncasdafaswdf);
            } else {
                klines.restore_first_candle()
            }
        } else {
            klines.restore_first_candle()
        }
    }
}
