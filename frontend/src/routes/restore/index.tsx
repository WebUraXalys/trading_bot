import {component$, useContext } from '@builder.io/qwik';
import { authContext } from '../layout';

 
export default component$(() => {
  const auth = useContext(authContext);

  return (
    <>
    <div class="">
    {auth.value.length < 10 ?
        <div class="min-h-screen bg-base-200 pt-[10%]">
            <h1 class=" text-center text-5xl font-bold">Відновлення паролю</h1>
            <div class="card flex-shrink-0 w-full max-w-7xl shadow-2xl bg-base-100 m-auto mt-5">
                <div class="p-10 text-2xl text-center">Для відновлення паролю потрібно занести команді розробки 3 великі пачки чіпсів Lays</div>
            </div>
        </div>
    :
        <div class="text-xl">Already signed in</div>}
    </div>
    </>
  )
});