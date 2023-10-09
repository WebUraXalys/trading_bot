use crate::candles::{*, self};
use std::sync::mpsc::{Receiver, TryRecvError};
use std::{thread, vec};
use std::sync::{mpsc, RwLock};
use binance::model::KlineEvent;

#[derive(Debug)]
struct CandleStore {
    candles: Vec<KlineEvent>,
    candle_reciever: Receiver<KlineEvent>,
}
impl CandleStore {
    // fn new() {
    //     CandleStore { candles: RwLock::new(vec![]) }
    // }
    
    
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
        if let Ok(r) = self.candle_reciever.try_recv() {
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
        println!("{} -=-=-=-= {:?}\n\n", cs.candles.len(), cs.candles);
    }
}