import {component$, useContext } from '@builder.io/qwik';
import { authContext } from '../layout';
import type { DocumentHead } from '@builder.io/qwik-city';

 
export default component$(() => {
  const auth = useContext(authContext);

  return (
    <>
    <div class="">
    {auth.value.length < 10 ?
        <div class="min-h-screen bg-base-100 pt-[10%]">
            <h1 class=" text-center text-2xl font-bold">Відновлення паролю</h1>
            <div class="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-200 m-auto mt-5 p-10">
                <div class="text-lg text-center">Для відновлення паролю потрібно занести команді розробки 3 великі пачки чіпсів Lays</div>
                <div class="text-lg text-center mt-6">Натисніть <a class="link link-secondary" href="mailto:xalys_jyra@meta.ua?subject=Відновлення паролю (чіпси)&body=Добрий день!%0D%0A%0D%0A Я, власник акаунту з логіном ВСТАВТЕ_СВІЙ_ЛОГІН, хочу відновити пароль від свого акаунту. Коли і куди мені занести чіпси?">сюди</a> для відправки сповіщення представнику команди розробників по факту вашої готовоності передати нам чіпси в найближчий час</div>
                <div class="text-md text-right mt-3">— З повагою, Розробники</div>
            </div>
        </div>
    :
        <div class="text-xl">Already signed in</div>}
    </div>
    </>
  )
});

export const head: DocumentHead = {
  title: "Відновлення | Trading Bot"
};

