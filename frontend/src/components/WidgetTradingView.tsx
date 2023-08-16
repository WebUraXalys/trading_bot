import { component$ } from "@builder.io/qwik";

export default component$(() => {
   const nameScript = `
    new TradingView.widget({
            "width": 880,
            "height": 610,
            "symbol": "BINANCE:BTCUSDT",
            "interval": "60",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "ru",
            "enable_publishing": false,
            "withdateranges": true,
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "save_image": false,
            "studies": [
               "STD;RSI"
            ],
            "container_id": "tradingview_c1b8a"
         });`;
  return (
    <>
      <div class="tradingview-widget-container">
      <div id="tradingview_c1b8a"></div>      
      <script dangerouslySetInnerHTML={nameScript} />
      </div>
    </>
  );
});



