import { component$} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Form, useNavigate, useLocation } from "@builder.io/qwik-city";
import { useSignin } from "~/routes/layout";

export default component$(() => {
   const action = useSignin();
    return (
        <>
         <div class="min-h-screen bg-base-200 pt-[10%]">
         <Form action={action} class="">
            <div class="text-center ">
               <h1 class="text-5xl font-bold">Login</h1>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
               <div class="card-body">
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="Логін" class="input input-bordered" name="login" />
               </div>
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="Пароль" class="input input-bordered" name="password" />
                  <label class="label">
                     <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                  </label>
               </div>
               <div class="form-control mt-6">
                  <button class="btn btn-primary" type="submit">Login</button>
               </div>
               </div>
               
            </div>
            <div class="btn_reg mt-3 text-center">
               {/* <Link href="/registration"><button class="btn btn-outline btn-primary w-[100%]">Registration</button></Link> */}
               <Link href="/registration" class="link link-primary">Registration</Link>
            </div>
            
            
         </Form>
         </div>
        </>
    )
});
