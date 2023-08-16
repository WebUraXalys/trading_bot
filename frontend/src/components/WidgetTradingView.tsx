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
            "container_id": "tradingview_3c5e9"
         });`;
  return (
    <>
      <div class="tradingview-widget-container">
      <div id="tradingview_c1b8a"></div>      
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
         <script dangerouslySetInnerHTML={nameScript} />
      </div>

    </>
  );
});



