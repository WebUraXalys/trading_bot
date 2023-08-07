import { component$, useComputed$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Form, useNavigate, useLocation } from "@builder.io/qwik-city";
import { useSignIn } from "~/routes/layout";
import { authContext } from "~/routes/layout";
import { isBrowser } from "@builder.io/qwik/build"
import APIKeysForm from "./APIKeysForm";



export default component$(() => {
   const action = useSignIn();
   const auth = useContext(authContext);
   const nav = useNavigate();
   const loc = useLocation();
   const q = loc.url.searchParams.get("q");
   const valueLogin = useSignal(q != null ? q : "");
   const valuePassword = useSignal("");

   useTask$(({ track }) => {
      track(() => action.value?.ok);
      const data = action.value?.data;
      if (action.value?.ok) {
         auth.value = data.key;
      }
      else {
         valuePassword.value = "";
      }
      if (isBrowser && action.value?.ok) {
         nav("/");
      }
   });

   const btnDisabled = useComputed$(() => {
      if (valueLogin.value.length > 2 && valuePassword.value.length > 11) {
         return false;
      }
      else {
         return true;
      }
   });

    return (
        <>
         <div class="min-h-screen bg-base-200 pt-[10%]">
            <Form action={action}>
               <div class="text-center ">
                  <h1 class="text-5xl font-bold">Вхід</h1>
               </div>
               <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
                  <div class="card-body">
                     <div class="form-control">
                        <label class="label">
                           <span class="label-text">Логін</span>
                           <span class="label-text text-error">{action.value?.failed ? <div>{action.value.fieldErrors?.login}</div> : <></>}</span>
                        </label>
                        <input type="text" placeholder="Логін" class="input input-bordered" name="login" bind:value={valueLogin} />
                     </div>
                     <div class="form-control">
                        <label class="label">
                           <span class="label-text">Пароль</span>
                           <span class="label-text text-error">{action.value?.failed ? <div>{action.value.fieldErrors?.password}</div> : <></>}</span>
                        </label>
                        <input type="password" placeholder="Пароль" class="input input-bordered" name="password" bind:value={valuePassword} />
                        <label class="label">
                           <Link href="/restore" class="label-text-alt link link-hover">Забули пароль?</Link>
                        </label>
                     </div>
                     <div class="form-control mt-6">
                        <span class="tooltip w-full" data-tip={btnDisabled.value && !action.value?.failed ? "Почніть вводити дані" : null}>
                           <button class="btn btn-primary w-full" type="submit" disabled={btnDisabled.value} >Увійти</button>
                        </span>
                        {action.value?.failed ? <div class="alert alert-error mt-4">{action.value.message}</div> : <></>}
                     </div>
                  </div>
               </div>
               <div class="mt-8 text-center max-w-sm m-auto">
                  {/* <Link href="/registration"><button class="btn btn-outline btn-primary w-[100%]">Registration</button></Link> */}
                  {loc.prevUrl?.pathname.includes("registration") && loc.url.searchParams.has("q") ? <div class="alert alert-success">Реєстрація успішна. Ви зможете увійти коли адміністрація схвалить ваш запит</div> : <Link href="/registration" class="link link-primary text-xl">Реєстрація</Link>}
               </div>
            </Form>
         </div>
        </>
    )
});
