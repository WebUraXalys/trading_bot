import { component$, useSignal } from "@builder.io/qwik";
import ListOfPairs from "~/components/ListOfPairs";
import WidgetTradingView from "~/components/WidgetTradingView";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const isOpen = useSignal(false);

  return (
    <>
    <div class="main_tr flex">
      <div class="left">
        <div class="checkbox_form flex justify-around">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Графік {isOpen.value}</span> 
              <input type="checkbox" class="checkbox" bind:checked={isOpen} />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Список свічок </span> 
              <input type="checkbox" checked class="checkbox" />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Калькулятор </span> 
              <input type="checkbox" checked class="checkbox" />
            </label>
          </div>
        </div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        {isOpen.value ? <WidgetTradingView/> : <div class="hidden"></div>} 
      </div>
      <div class="right">
        <ListOfPairs />
      </div>
    </div>
      
      
    </>
  );
});

export const head: DocumentHead = {
  title: "Термінал | Trading Bot",
};

