fn algo(){
   let half_first_kline = (kline_event.kline.high - kline_event.kline.low)*0.5 +kline_event.kline.low; 
   if list_of_candles[1].kline_event.kline.high > list_of_candles[0].kline_event.kline.high {
      if list_of_candles[1].kline_event.kline.low > half_first_kline {

      } else {
         list_of_candles[0] = list_of_candles[1];
         list_of_candles.pop();
      }  
   } else {
      list_of_candles[0] = list_of_candles[1];
      list_of_candles.pop();

   }
}

//println!("Symbol: {}, high: {}, low: {}, start time: {}, end time: {}", kline_event.kline.symbol, kline_event.kline.low, kline_event.kline.high, kline_event.kline.open_time, kline_event.kline.close_time);
