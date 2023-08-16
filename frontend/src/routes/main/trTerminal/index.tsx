import { component$ } from "@builder.io/qwik";
import ListOfPairs from "~/components/ListOfPairs";
import WidgetTradingView from "~/components/WidgetTradingView";

export default component$(() => {
  return (
    <>
    <div class="main_tr flex">
      <div class="left">
        <WidgetTradingView/>
      </div>
      <div class="right">
        <ListOfPairs />
      </div>
    </div>
      
      
    </>
  );
});
