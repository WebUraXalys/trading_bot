import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import ThemeSwitchBtn from "~/components/ThemeSwitchBtn";


export default component$(() => {
  return (
    <>
     <div class="clas"> Hellow</div>
     <ThemeSwitchBtn />
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
