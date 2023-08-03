import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Form, useNavigate } from "@builder.io/qwik-city";
import { useSignUp } from "~/routes/layout";
import { isBrowser } from "@builder.io/qwik/build"


export default component$(() => {
   const email = useSignal("");
   const password = useSignal("");
   const password2 = useSignal("");
   const action = useSignUp();
   const nav = useNavigate();
   
   
   useTask$(({ track }) => {
      track(() => {action.value?.ok});
      if (isBrowser && action.value?.ok) {
         nav("/login/?q");
      }
   });

    return (
        <>
         <div class="min-h-screen bg-base-200 pt-[10%]">
         <div class="">
            <div class="text-center">
               <h1 class="text-5xl font-bold">Реєстрація</h1>
               {/* <p class="py-6">APP</p> */}
            </div>
            <Form action={action} class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
               <div class="card-body">
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Логін</span>
                     <span class="text-error">{action.value?.failed ? <div>{action.value.fieldErrors?.login}</div> : <></>}</span>
                  </label>
                  <input type="text" placeholder="Логін" name="login" class="input input-bordered" bind:value={email}/>
               </div>
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Пароль</span>
                     <span class="text-error">{action.value?.failed ? <div>{action.value.fieldErrors?.password}</div> : <></>}</span>
                  </label>
                  <input type="password" placeholder="Пароль" name="password" class="input input-bordered" bind:value={password} />
                  <label class="label">
                     <span class="label-text">Повторіть пароль</span>
                  </label>
                  <input type="password" placeholder="Пароль" name="password2" class="input input-bordered" bind:value={password2}/>
               </div>
               <div class="form-control mt-6">
                  <button class="btn btn-primary" type="submit">Зареєструватись</button>
                  {action.value?.failed ? <div class="alert alert-error mt-2">Некоректні дані <br />{action.value.formErrors}</div> : <></>}
               </div>
               </div>
            </Form>
         </div>
         </div>
        </>
    )
})


{/* <input type="email" placeholder="Пошта" class="input w-full max-w-sm m-auto" bind:value={email} />
                    <input type="password" placeholder="Пароль" class="input w-full max-w-sm m-auto" bind:value={passw} />
                    <button type="submit" class="w-full max-w-sm m-auto btn btn-primary" onClick$={() => {
                        if (email.value.length > 8 && passw.value.length > 8 && email.value.includes("@")) {
                            Cookies.set("userLoggedIn", true, {"max-age": "3600"});
                            userLoggedIn.value = true;
                            if (loc.prevUrl?.pathname == loc.url.pathname) {
                                nav("/");
                            }
                            else {
                                nav(loc.prevUrl?.pathname);
                            }
                        }
                        else {
                            incorrect.value = true;
                        }
                    }}>Я готовий!</button>
                    {incorrect.value ? <div class="alert alert-error m-auto max-w-sm mt-1">Некоректні дані</div> : <div class="alert alert-error m-auto max-w-sm mt-1 hidden">.</div>} */}
