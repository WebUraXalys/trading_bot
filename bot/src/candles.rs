use binance::api::*;
use std::default::Default;

use binance::model::{KlineEvent, Kline};
use binance::websockets::*;
use std::sync::atomic::AtomicBool;
use std::sync::mpsc::Sender;


pub fn get_klines_btcusdt_10_pcs(sender: Sender<KlineEvent>) {
    let keep_running = AtomicBool::new(true); // Used to control the event loop
    let kline = format!("{}", "btcusdt@kline_1m");
    let mut web_socket = WebSockets::new(|event: WebsocketEvent| {
        match event {
            WebsocketEvent::Kline(kline_event) => {
                if kline_event.kline.is_final_bar {
                    let _ = sender.send(kline_event.clone());
                }
            },
            _ => (),
        };
        Ok(())
    });
 
    web_socket.connect(&kline).unwrap(); // check error
    if let Err(e) = web_socket.event_loop(&keep_running) {
        match e {
          err => {
             println!("Error: {:?}", err);
          }
        }
     }
     web_socket.disconnect().unwrap();

    // let market: Market = Binance::new(None, None);
    // match market.get_klines("BTCUSDT", "1m", 10, None, None) {
    //     Ok(klines) => {
    //         match klines {
    //             binance::model::KlineSummaries::AllKlineSummaries(klines) => {
    //                 println!("{:?}", klines[9]);
    //             }
    //         }            
    //     }
    //     Err(e) => println!("Error: {}", e),
    //}
}
//https://docs.rs/crate/binance/latest
//https://doc.rust-lang.org/std/sync/mpsc/index.html

