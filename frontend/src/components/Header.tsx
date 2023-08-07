import { component$, useContext} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { authContext } from "~/routes/layout";
import ThemeSwitchBtn from "./ThemeSwitchBtn";
import LogoutBtn from "./LogoutBtn";


export default component$(() => {
   const auth = useContext(authContext)


    return (
        <>
         <div class="navbar bg-base-300">
         <div class="flex-none">
            {/* <button class="btn btn-square btn-ghost">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button> */}
         </div>
         <div class="flex-1">
            <Link href="/" class="btn btn-ghost normal-case text-xl">Trading Bot</Link>
         </div>
         {/* <div class="flex-none">
            <button class="btn btn-square btn-ghost">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
         </div> */}
         <div class="flex-none">
            <ul class="menu menu-horizontal px-5">
               <li class="mt-1"><a>Link</a></li>
               <li class="mt-1">
               <details>
                  <summary>
                     Parent
                  </summary>
                  <ul class="p-2 bg-base-100">
                     <li><a>Link 1</a></li>
                     <li><a>Link 2</a></li>
                  </ul>
               </details>
               </li>
               <span class="mt-3 m-4"><ThemeSwitchBtn/></span>
               {auth.value.length > 8 ?
                  <LogoutBtn/>
               :
                  <Link href="/login"><button class="btn btn-primary">Ввійти</button></Link>
               }
               
            </ul>
         </div>
         </div>
        </>
    )
});