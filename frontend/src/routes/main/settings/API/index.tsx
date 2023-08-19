import {component$ } from '@builder.io/qwik';
import APIKeysForm from '~/components/APIKeysForm';
import type { DocumentHead } from '@builder.io/qwik-city';

 
export default component$(() => {


  return (
    <>
      <APIKeysForm/>
    </>
  )
});

export const head: DocumentHead = {
  title: "Ключі | Trading Bot",
};
