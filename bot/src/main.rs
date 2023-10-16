#![allow(dead_code, unused_variables, unused_imports, unreachable_code)]
mod candles;
use candles::*;
mod candlestore;
use candlestore::*;
mod worker;
use worker::*;
mod fib;
use fib::*;
use std::thread;
use std::sync::mpsc;
use binance::model::KlineEvent;
use log::{error, info, warn};
use log4rs;

fn main() {
    log4rs::init_file("config/log4rs.yaml", Default::default()).unwrap();
    info!("booting up");

    let (sender, reciever) = mpsc::channel::<KlineEvent>();

    let jh = thread::spawn(move|| {
        store();
        get_klines_btcusdt_10_pcs(sender.clone());
    });
    

    // loop {
    //     let kline_event = reciever.recv().unwrap();
    //     println!("Symbol: {}, high: {}, low: {}, start time: {}, end time: {}", kline_event.kline.symbol, kline_event.kline.low, kline_event.kline.high, kline_event.kline.open_time, kline_event.kline.close_time);
    // }
    let _ = jh.join();
    
}

// export const ssr = false;
