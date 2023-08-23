import { component$, useContext, useComputed$, useSignal, useStore, $} from "@builder.io/qwik";
import { type actionStore, updateGetAction } from "~/actionActix";
import { authContext } from "~/routes/layout";
import axios from "axios";
interface ItemProps {
  symbol: string;
}
// export const Item = component$<ItemProps>((props) => {
//   return (
//       <div class="tabs">
//          <a class={[ props.limit, 'tab']} onClick$={() => {}}>Limit</a> {/*  */}
//          <a class={[ props.market, 'tab']} onClick$={() => {props.limit = "tab"; props.limit = "tab";  console.log(props.limit); console.log(props.market)}}>Market</a> 
//       </div>
//   );
// });


export default component$<ItemProps>((props) => {
   const limitBtn = useSignal('tab');
   const marketBtn = useSignal('tab-active');
   const orderType = useComputed$(() => {
      if (limitBtn.value == "tab") {
         return "MARKET";
      }
      else {
         return "LIMIT";
      }
   });
   const isChecked = useSignal(false);
   const auth = useContext(authContext);
   const side = useSignal("BUY");
   const quantity = useSignal<string>();
   const price = useSignal<string>();


   const respFn = $(async function (self: actionStore) {
      const resp = await axios.get(self.endpoint_url, {
        params: {
          symbol: props.symbol,
          side: side.value,
          type: orderType.value,
          quantity: quantity.value,
          timeInForce: "GTC",
          price: price.value,
        },
        headers: {
          Authorization: `Bearer ${auth.value}`
        },
        withCredentials: true
      });
      return resp;
   });

   const action = useStore<actionStore>({
      inAction: false,
      endpoint_url: "http://127.0.0.1:8000/exchange/new_order",
      updateGetAction: updateGetAction,
   })


    return (
        <>
      {/* <Item market="" limit="" /> */}
         <div class="tabs mt-5">
            <a class={[ limitBtn.value, 'tab', 'text-lg']} onClick$={() => {marketBtn.value = 'tab'; limitBtn.value='tab-active'}}>Limit</a> 
            <a class={[ marketBtn.value, 'tab', 'text-lg']} onClick$={() => {limitBtn.value = 'tab'; marketBtn.value='tab-active'}}>Market</a> 
        </div>
        <div class="inputs_order mb-5">
        {limitBtn.value == "tab-active" ? 
        <div class="input_for_market">
            <div class="form-control mt-2">
               <label class="input-group">
                  <span>Price</span>
                  <input bind:value={price} type="number" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
            <div class="form-control mt-2">
               <label class="input-group">
                  <span class="pr-[22px]">Size</span>
                  <input bind:value={quantity} type="number" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
         </div> : 
         <div class="input_for_limit">
            <div class="form-control mt-2">
               <label class="input-group">
                  <span class="pr-[22px]">Size</span>
                  <input bind:value={quantity} type="number" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
         </div>}
         </div>
         <hr />
         <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-3">Take Profit/ Stop Loss {isChecked.value}</span> 
              <input type="checkbox" class="checkbox" bind:checked={isChecked} />
            </label>
          </div>
          {isChecked.value ? 
          <div class="inputs_tp_sl mb-5">
            <div class="form-control">
               <label class="label">
                  <span class="label-text">Take Profit</span>
               </label>
               <label class="input-group ">
                  <input type="number" placeholder="11" class="input input-bordered w-[76%]" />
                  <span>USDT</span>
               </label>
            </div>
            <div class="form-control">
               <label class="label">
                  <span class="label-number">Stop Loss</span>
               </label>
               <label class="input-group">
                  <input type="number" placeholder="9" class="input input-bordered w-[76%]" />
                  <span>USDT</span>
               </label>
             </div>
          </div>
          : null} 
         <hr />
         <div class="buttons mt-6 flex justify-around">
            <button class="btn bg-[#0ecb81] text-white" onClick$={() => {
               side.value = "BUY";
               action.updateGetAction(respFn, auth);
            }}>Buy/Long</button>
            <button class="btn bg-[#f6465d] text-white" onClick$={() => {
               side.value = "SELL";
               action.updateGetAction(respFn, auth);
            }}>Sell/Short</button>
         </div>
         </>
    )
});




 

 

