import { component$, Slot } from "@builder.io/qwik";

interface ItemProps {
    dataTip: string,
    disabled?: boolean,
    class?: string,
  }

export default component$<ItemProps>((props) => {

  return (
    <>
        <div class={`${props.class} ${props.disabled ? null : "tooltip"}`} data-tip={props.dataTip}>
            <Slot/>
        </div>
    </>
    );
});
