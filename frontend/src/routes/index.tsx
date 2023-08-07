import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Header from "~/components/Header";
import Menu from "~/components/Menu";
import LogoutBtn from "~/components/LogoutBtn";
import APIKeysForm from "~/components/APIKeysForm";
import MainPage from "~/components/MainPage";


export default component$(() => {
  return (
    <>
     <Header/>
     <div class="drawer lg:drawer-open">
         <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
         <div class="drawer-content flex flex-col items-center justify-center">
          <MainPage/>
         </div>
          <Menu/> 
         {/* <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">
               <li><a>Головна сторінка</a></li>
               <li><a>Trading Bot</a></li>
               <li><a>Trading Terminal</a></li>
            </ul>
         </div> */}
         </div>
     
    </>
  )});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
