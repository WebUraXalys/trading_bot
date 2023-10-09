#![allow(dead_code, unused_variables, unused_imports, unreachable_code)]
mod candles;
use candles::*;
mod candlestore;
use candlestore::*;
use std::thread;
use std::sync::mpsc;
use binance::model::KlineEvent;

fn main() {
    let (sender, reciever) = mpsc::channel::<KlineEvent>();

    let jh = thread::spawn(move|| {
        get_klines_btcusdt_10_pcs(sender.clone());
    });
    
    store();

    loop {
        let kline_event = reciever.recv().unwrap();
        println!("Symbol: {}, high: {}, low: {}, start time: {}, end time: {}", kline_event.kline.symbol, kline_event.kline.low, kline_event.kline.high, kline_event.kline.open_time, kline_event.kline.close_time);
    }
    let _ = jh.join();
    
}
