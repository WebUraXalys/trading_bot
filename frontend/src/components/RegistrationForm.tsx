import { component$, useSignal, useContext } from "@builder.io/qwik";
import { Form, useNavigate, useLocation } from "@builder.io/qwik-city";
import { getRegistration } from "~/routes/layout";


export default component$(() => {
   const email = useSignal("");
   const password = useSignal("");
   const password2 = useSignal("");
   const incorrect = useSignal(false);
   const action = getRegistration();

    return (
        <>
         <div class=" min-h-screen bg-base-200 pt-[10%]">
         <div class="">
            <div class="text-center">
               <h1 class="text-5xl font-bold">Registration</h1>
               {/* <p class="py-6">APP</p> */}
            </div>
            <Form action={action} class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
               <div class="card-body">
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="Email" name="email" class="input input-bordered" bind:value={email}/>
               </div>
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="Password" name="password" class="input input-bordered" bind:value={password} />
                  <label class="label">
                     <span class="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="Password " name="password2" class="input input-bordered" bind:value={password2}/>
               </div>
               <div class="form-control mt-6">
                  <button class="btn btn-primary" type="submit" onClick$={()=>{
                        if (email.value.length > 8 && password.value.length > 8 && email.value.includes("@") && password2.value.length > 8 && password.value == password2.value) {
                           console.log("+");
                        }
                        else {
                            incorrect.value = true;
                        }
                  }}>Registration</button>
                  {incorrect.value ? <div class="alert alert-error m-auto max-w-sm mt-1">Некоректні дані</div> : <div class="alert alert-error m-auto max-w-sm mt-1 hidden">.</div>} 
               </div>
               </div>
               {/* {action.value?.ok} */}
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
