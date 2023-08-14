import { component$ } from "@builder.io/qwik";
import { useGetPairs } from "~/routes/layout";


export default component$(() => {
    const pairs = useGetPairs();

  return (
    <>
      <div class="form-control mt-2">
        <div class="input-group">
          <select class="select select-bordered">
            <option disabled selected>
              Обиріть торгову пару
            </option>
            {pairs.value.ok ? pairs.value.data.data.map((pair: any) => (
                <option key={pair.pair} value="">{pair.pair}</option>
                )) : <option>Немає API ключа</option>}
                
          </select> 
          <option value=""></option>
          <button class="btn">Go</button>
        </div>
      </div>
    </>
  );
});
