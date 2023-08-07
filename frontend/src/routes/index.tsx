import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Header from "~/components/Header";
import Menu from "~/components/Menu";
import LogoutBtn from "~/components/LogoutBtn";
import APIKeysForm from "~/components/APIKeysForm";


export default component$(() => {
  return (
    <>
     <Header/>
     <Menu/>
     <APIKeysForm/>
    </>
  )});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
