import { component$, useComputed$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { authContext } from "~/routes/layout";
import Cookies from "js-cookie";



export default component$(() => {
   const auth = useContext(authContext);
   const btnDisabled = useComputed$(() => {
        if (auth.value.length > 8) {
            return false;
        }
        else {
            return true;
        }
   });

    return (
        <>
         <button class="btn btn-ghost" disabled={btnDisabled.value} onClick$={() => {
            auth.value = "";
         }}>Вийти</button>
        </>
    )
});
