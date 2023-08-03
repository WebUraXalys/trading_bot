import { component$, useContext, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Form, useNavigate, useLocation } from "@builder.io/qwik-city";
import { useSignIn } from "~/routes/layout";
import { authContext } from "~/routes/layout";
import { isBrowser } from "@builder.io/qwik/build"
import ThemeSwitchBtn from "./ThemeSwitchBtn";



export default component$(() => {
   const action = useSignIn();
   const auth = useContext(authContext);
   const nav = useNavigate();
   const loc = useLocation();

   useTask$(({ track }) => {
      track(() => action.value?.ok);
      const data = action.value?.data;
      if (action.value?.ok) {
         auth.value = data.key;
      }
      if (isBrowser && action.value?.ok) {
         nav("/");
      }
   });

    return (
        <>
         <div class="min-h-screen bg-base-200 pt-[10%]">
         <Form action={action} class="">
            <div class="text-center ">
               <h1 class="text-5xl font-bold">Вхід</h1>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
               <div class="card-body">
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Логін</span>
                  </label>
                  <input type="text" placeholder="Логін" class="input input-bordered" name="login" />
               </div>
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Пароль</span>
                  </label>
                  <input type="password" placeholder="Пароль" class="input input-bordered" name="password" />
                  <label class="label">
                     <Link href="/restore" class="label-text-alt link link-hover">Забули пароль?</Link>
                  </label>
               </div>
               <div class="form-control mt-6">
                  <button class="btn btn-primary" type="submit">Увійти</button>
               </div>
               </div>
               
            </div>
            <div class="btn_reg mt-8 text-center max-w-sm m-auto">
               {/* <Link href="/registration"><button class="btn btn-outline btn-primary w-[100%]">Registration</button></Link> */}
               {loc.prevUrl?.pathname.includes("registration") && loc.url.searchParams.has("q") ? <div class="alert alert-success">Реєстрація успішна. Тепер ви можете увійти</div> : <Link href="/registration" class="link link-primary text-xl">Реєстрація</Link>}
            </div>
            
         </Form>
         </div>
         
        </>
    )
});
