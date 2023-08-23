import { component$, useContext} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";



export default component$(() => {

    return (
        <>
         <div class="tabs">
            <a class="tab">Limit</a> 
            <a class="tab tab-active">Market</a> 
        </div>
         <div class="input_for_limit">
            <div class="form-control">
               <label class="label">
                  <span class="label-text">Enter amount</span>
               </label>
               <label class="input-group">
                  <span>Size</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
         </div>
         <div class="input_for_market">
            <div class="form-control">
               <label class="label">
                  <span class="label-text">Enter amount</span>
               </label>
               <label class="input-group">
                  <span>Price</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
            <div class="form-control">
               <label class="label">
                  <span class="label-text">Enter amount</span>
               </label>
               <label class="input-group">
                  <span>Size</span>
                  <input type="text" placeholder="10" class="input input-bordered" />
                  <span>USDT</span>
               </label>
            </div>
         </div>
        </>
    )
});