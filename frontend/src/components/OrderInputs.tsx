import { component$, useContext, useComputed$, type Signal, useSignal} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
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
   // const activeBtn = useComputed$(() => {
   // })
   const limitBtn = useSignal('tab');
   const marketBtn = useSignal('tab-active');


    return (
        <>
      {/* <Item market="" limit="" /> */}
         <div class="tabs">
            <a class={[ limitBtn.value, 'tab']} onClick$={() => {marketBtn.value = 'tab'; limitBtn.value='tab-active'}}>Limit</a> 
            <a class={[ marketBtn.value, 'tab']} onClick$={() => {limitBtn.value = 'tab'; marketBtn.value='tab-active'}}>Market</a> 
        </div>
        {marketBtn.value == "tab-active" ? <div class="input_for_market">
            <div class="form-control">
               {/* <label class="label">
                  <span class="label-text">Enter amount</span>
               </label> */}
               <label class="input-group">
                  <span>Price</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
            <div class="form-control">
               {/* <label class="label">
                  <span class="label-text">Enter amount</span>
               </label> */}
               <label class="input-group">
                  <span>Size</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
         </div> : <div class="input_for_limit">
            <div class="form-control">
               {/* <label class="label">
                  <span class="label-text">Enter amount</span>
               </label> */}
               <label class="input-group">
                  <span>Size</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
         </div>}
         
         </>
    )
});




 

 

