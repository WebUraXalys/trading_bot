import { component$ } from "@builder.io/qwik";
import { useGetPairs } from "~/routes/layout";


export default component$(() => {
    const pairs = useGetPairs();

  return (
    <>
      {/* <div class="form-control mt-2">
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
      </div> */}



      <div class="join">
      <div>
        <select class="select select-bordered join-item">
            <option disabled selected>
              Обиріть торгову пару
            </option>
            {pairs.value.ok ? pairs.value.data.data.map((pair: any) => (
                <option key={pair.pair} value="">{pair.pair}</option>
                )) : <option>Немає API ключа</option>}
          </select> 
      </div>
      <select class="select select-bordered join-item">
        <option disabled selected>Time Frame</option>
        <option>1h</option>
        <option>2h</option>
        <option>4h</option>
      </select>
      <div class="indicator">
        <button class="btn join-item">Search</button>
      </div>
    </div>
    </>
  );
});
