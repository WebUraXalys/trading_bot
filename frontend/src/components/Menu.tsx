import { component$, useComputed$, useContext} from "@builder.io/qwik";
import { authContext } from "~/routes/layout";
import { Link } from "@builder.io/qwik-city";




export default component$(() => {
    return (
        <>
         {/* <div class="drawer lg:drawer-open">
         <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
         <div class="drawer-content flex flex-col items-center justify-center">
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
         
         </div> 
         <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">
               <li><a>Головна сторінка</a></li>
               <li><a>Trading Bot</a></li>
               <li><a>Trading Terminal</a></li>
            </ul>
         </div>
         </div> */}

         <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-60 h-screen bg-base-200 text-base-content">
            <li><Link href="/" class="btn btn-ghost normal-case text-xl mb-8">Trading Bot</Link></li>
               <li><a>Головна сторінка</a></li>
               <li><a>Trading Bot</a></li>
               <li><a>Trading Terminal</a></li>
               <li><a>API settings</a></li>
            </ul>
         </div>
        </>
    )
});