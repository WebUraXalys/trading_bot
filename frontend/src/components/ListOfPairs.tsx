import { component$, useStore, useContext, useSignal, $ } from "@builder.io/qwik";
import { useGetPairs } from "~/routes/layout";
import axios from 'axios';
import { authContext } from "~/routes/layout";


export default component$(() => {
  const auth = useContext(authContext)
  const symbolValue = useSignal<string>();
  const intervalValue = useSignal<string>();

  const pairs = useGetPairs();
  // const action = useSearchPairInfo();
  const action = useStore({
    
    ok: false,
    failed: false,
    message: "",
    data: [],
    updateSearchPairInfo: $(async function (this: any) {
      const startTime = performance.now();
      const resp = await axios.get(`http://127.0.0.1:8000/exchange/pair_info`, {
        params: {
          symbol: symbolValue.value,
          interval: intervalValue.value
        },
        headers: {
          Authorization: `Bearer ${auth.value}`
        }
      });
      const endTime = performance.now();
      if (resp.status == 200) {
        this.data = resp.data;
        this.ok = true;
      }
      else {
        this.failed = true;
        this.message = "Виникла помилка. Зверніться до адміністрації"
      }
      console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
    })
  });

  return (
    <>
    {/* <Form action={action}> */}
      <div class="join">
      <div>
        <select name="symbol" class="select select-bordered join-item" bind:value={symbolValue}>
            <option disabled selected>
              Обиріть торгову пару
            </option>
            {pairs.value.ok ? pairs.value.data.map((symbol: any) => (
                <option key={symbol.symbol} value={symbol.symbol}>{symbol.symbol}</option>
                )) : <option>Немає API ключа</option>}
          </select> 
      </div>
      <select name="interval" class="select select-bordered join-item" bind:value={intervalValue}>
        <option disabled selected>Time Frame</option>
        <option>1h</option>
        <option>2h</option>
        <option>4h</option>
      </select>
      <div class="indicator">
        <button class="btn join-item" onClick$={() => {action.updateSearchPairInfo()}}>а як взагалі ця кнопка має називатись (що вона робить)?</button>
      </div>
    </div>
    {/* </Form> */}
    {action.failed ? <div class="alert alert-error">{action.message}</div> : null}
    {action.ok ? <div class="alert alert-success">Успішно отримано інформацію по парі</div> : null}
    <ul>
      {action.data.map((el: any) => (
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
