use crate::candles::{*, self};
use crate::worker::run_bot_worker;
use std::sync::mpsc::{Receiver, TryRecvError};
use std::{thread, vec};
use std::sync::{mpsc, RwLock};
use binance::model::KlineEvent;

#[derive(Debug)]
pub struct CandleStore {
    pub candles: Vec<KlineEvent>,
    candle_reciever: Receiver<KlineEvent>,
}
impl CandleStore {
    // fn new() {
    //     CandleStore { candles: RwLock::new(vec![]) }
    // }

    pub fn restore_first_candle(&mut self) {
        self.candles[0] = self.candles[1].clone();
        self.candles.remove(1);
    }
    
    fn init_store_collector() -> Self {
        let jh = thread::spawn(|| -> CandleStore {
            let (sender, reciever) = mpsc::channel::<KlineEvent>();

            let _ = thread::spawn(move|| {
                get_klines_btcusdt_10_pcs(sender.clone());
            });

            CandleStore {candles: vec![], candle_reciever: reciever}
        });
        jh.join().unwrap()
    }

    fn update(&mut self) -> Option<()> {
        if let Ok(r) = self.candle_reciever.recv() {
            self.candles.push(r.clone());
            Some(())
        } else {
            None
        }
        
    }
}

pub fn store() {
    let mut cs = CandleStore::init_store_collector();
    loop {
        cs.update();
        run_bot_worker(&mut cs);
        //println!("{} -=-=-=-= {:?}\n\n", cs.candles.len(), cs.candles);
    }
}