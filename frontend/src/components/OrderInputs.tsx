import { component$, useContext, useComputed$, type Signal, useSignal} from "@builder.io/qwik";
// interface ItemProps {
//   limit?: string;
//   market?: string;
// }
// export const Item = component$<ItemProps>((props) => {
//   return (
//       <div class="tabs">
//          <a class={[ props.limit, 'tab']} onClick$={() => {}}>Limit</a> {/*  */}
//          <a class={[ props.market, 'tab']} onClick$={() => {props.limit = "tab"; props.limit = "tab";  console.log(props.limit); console.log(props.market)}}>Market</a> 
//       </div>
//   );
// });


export default component$(() => {
   const limitBtn = useSignal('tab');
   const marketBtn = useSignal('tab-active');
   const isChecked = useSignal(false);


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
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
            <div class="form-control mt-2">
               <label class="input-group">
                  <span class="pr-[22px]">Size</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
         </div> : 
         <div class="input_for_limit">
            <div class="form-control mt-2">
               <label class="input-group">
                  <span class="pr-[22px]">Size</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
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
                  <input type="text" placeholder="11" class="input input-bordered w-[76%]" />
                  <span>USDT</span>
               </label>
            </div>
            <div class="form-control">
               <label class="label">
                  <span class="label-text">Stop Loss</span>
               </label>
               <label class="input-group">
                  <input type="text" placeholder="9" class="input input-bordered w-[76%]" />
                  <span>USDT</span>
               </label>
             </div>
          </div>
          : null} 
         <hr />
         <div class="buttons mt-6 flex justify-around">
            <button class="btn bg-[#0ecb81] text-white">Buy/Long</button>
            <button class="btn bg-[#f6465d] text-white">Sell/Short</button>
         </div>
         </>
    )
});




 

 

