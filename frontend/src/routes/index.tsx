import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import ThemeSwitchBtn from "~/components/ThemeSwitchBtn";
import Header from "~/components/Header";
import LogoutBtn from "~/components/LogoutBtn";


export default component$(() => {
  return (
    <>
     <Header/>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
