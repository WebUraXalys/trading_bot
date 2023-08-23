import { component$, useSignal } from "@builder.io/qwik";
import ListOfPairs from "~/components/ListOfPairs";
import WidgetTradingView from "~/components/WidgetTradingView";
import type { DocumentHead } from "@builder.io/qwik-city";
import OrderInputs from "~/components/OrderInputs";
import TableOfCandles from "~/components/TableOfCandles";

export default component$(() => {
  const isOpenChart = useSignal(false);
  const isOpenTable = useSignal(true);

  return (
    <>
    <div class="main_tr flex ">
      <div class="left w-[70%]">
        <div class="checkbox_form flex justify-around">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Графік {isOpenChart.value}</span> 
              <input type="checkbox" class="checkbox" bind:checked={isOpenChart} />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Список свічок {isOpenTable.value}</span> 
              <input type="checkbox" checked class="checkbox"bind:checked={isOpenTable}  />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Калькулятор </span> 
              <input type="checkbox" checked class="checkbox" />
            </label>
          </div>
        </div>
        {isOpenChart.value ? <WidgetTradingView /> : null} 
        {isOpenTable.value ? <TableOfCandles/> : null} 
      </div>
      <div class="right w-[30%] max-w-[350px]">
        <ListOfPairs />
        {/* <OrderInputs/> */}
      </div>
    </div>
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    </>
  );
});

export const head: DocumentHead = {
  title: "Термінал | Trading Bot",
};

