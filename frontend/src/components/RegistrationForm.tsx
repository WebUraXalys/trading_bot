import { component$} from "@builder.io/qwik";
// import { Form, useNavigate, useLocation } from "@builder.io/qwik-city";

export default component$(() => {

    return (
        <>
         <div class=" min-h-screen bg-base-200 pt-[10%]">
         <div class="">
            <div class="text-center">
               <h1 class="text-5xl font-bold">Registration</h1>
               {/* <p class="py-6">APP</p> */}
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
               <div class="card-body">
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="Email" class="input input-bordered" />
               </div>
               <div class="form-control">
                  <label class="label">
                     <span class="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="Password" class="input input-bordered" />
                  <label class="label">
                     <span class="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="Password " class="input input-bordered" />
               </div>
               <div class="form-control mt-6">
                  <button class="btn btn-primary">Registration</button>
               </div>
               </div>
            </div>
         </div>
         </div>
        </>
    )
})
