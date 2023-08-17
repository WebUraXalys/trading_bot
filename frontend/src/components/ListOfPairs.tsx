import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useGetPairs } from "~/routes/layout";
import { useSearchPairInfo } from "~/routes/layout";


export default component$(() => {
    const pairs = useGetPairs();
    const action = useSearchPairInfo();

  return (
    <>
    <Form action={action}>
      <div class="join">
      <div>
        <select name="symbol" class="select select-bordered join-item">
            <option disabled selected>
              Обиріть торгову пару
            </option>
            {pairs.value.ok ? pairs.value.data.map((symbol: any) => (
                <option key={symbol.symbol} value={symbol.symbol}>{symbol.symbol}</option>
                )) : <option>Немає API ключа</option>}
          </select> 
      </div>
      <select name="interval" class="select select-bordered join-item">
        <option disabled selected>Time Frame</option>
        <option>1h</option>
        <option>2h</option>
        <option>4h</option>
      </select>
      <div class="indicator">
        <button type="submit" class="btn join-item">а як взагалі ця кнопка має називатись (що вона робить)?</button>
      </div>
    </div>
    </Form>
    {action.value?.failed ? <div class="alert alert-error">{action.value.message}</div> : null}
    {action.value?.ok ? <div class="alert alert-success">Успішно отримано інформацію по парі</div> : null}
    <ul>
      {action.value?.data.map((el: any) => (
        <li key={el}><ul class="alert alert-info">
            <li>Open time: {el[0]}</li>
            <li>Open price: {el[1]}</li>
            <li>High price: {el[2]}</li>
            <li>Low price: {el[3]}</li>
            <li>Close price: {el[4]}</li>
        </ul></li>
        
      ))}
    </ul>
    </>
  );
});
