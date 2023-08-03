import { component$, useSignal, useTask$, useComputed$ } from "@builder.io/qwik";
import { Form, useNavigate, Link } from "@builder.io/qwik-city";
import { useSignUp } from "~/routes/layout";
import { isBrowser } from "@builder.io/qwik/build"


export default component$(() => {
   const action = useSignUp();
   const nav = useNavigate();
   const valueLogin = useSignal("");
   const valuePassword = useSignal("");
   const valuePassword2 = useSignal("");

   
   
   useTask$(({ track }) => {
      track(() => {action.value?.ok});
      if (isBrowser && action.value?.ok) {
         nav("/login/?q");
      }
   });

   const btnDisabled = useComputed$(() => {
      if (valueLogin.value.length > 2 && valuePassword.value.length > 11 && valuePassword2.value.length > 1 && valuePassword.value == valuePassword2.value) {
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
               <div class="text-center">
                  <h1 class="text-5xl font-bold">Реєстрація</h1>
                  {/* <p class="py-6">APP</p> */}
               </div>
               <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
                  <div class="card-body">
                     <div class="form-control">
                        <label class="label">
                           <span class="label-text">Логін</span>
                           <span class="label-text text-error">{action.value?.failed ? <div>{action.value.fieldErrors?.login}</div> : <></>}</span>
                        </label>
                        <input type="text" placeholder="Логін" name="login" class="input input-bordered" bind:value={valueLogin}/>
                     </div>
                     <div class="form-control">
                        <label class="label">
                           <span class="label-text">Пароль</span>
                           <span class="label-text text-error">{action.value?.failed ? <div>{action.value.fieldErrors?.password}</div> : <></>}</span>
                        </label>
                        <input type="password" placeholder="Пароль" name="password" class="input input-bordered" bind:value={valuePassword} />
                        <label class="label">
                           <span class="label-text">Повторіть пароль</span>
                           <span class="label-text text-error">{!valuePassword.value.startsWith(valuePassword2.value) ? <div>Паролі не збігаються</div> : <></>}</span>
                        </label>
                        <input type="password" placeholder="Пароль" name="password2" class="input input-bordered" bind:value={valuePassword2}/>
                     </div>
                     <div class="form-control mt-6">
                        <span class="tooltip w-full" data-tip={btnDisabled.value && !action.value?.failed ? "Почніть вводити дані" : null}>
                           <button class="btn btn-primary w-full" type="submit" disabled={btnDisabled.value}>Зареєструватись</button>
                        </span>
                        {action.value?.failed ? <div class="alert alert-error mt-2">Некоректні дані <br />{action.value.formErrors}</div> : <></>}
                     </div>
                  </div>
               </div>
               <div class="mt-8 text-center max-w-sm m-auto">
                  <Link href="/login" class="link link-primary text-xl">Вхід</Link>
               </div>
            </Form>
         </div>
      </>
    )
});
