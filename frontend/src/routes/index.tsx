import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import MainPage from "~/components/MainPage";


export default component$(() => {
  return (
    <>
      <MainPage/>
    </>
  )});

export const head: DocumentHead = {
  title: "Головна | Trading Bot"
};
