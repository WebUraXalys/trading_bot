import { component$, useStore, useContext, useSignal, $, useComputed$ } from "@builder.io/qwik";
import { useGetPairs } from "~/routes/layout";
import axios from 'axios';
import { authContext } from "~/routes/layout";
import OrderInputs from "./OrderInputs";


export default component$(() => {
  const auth = useContext(authContext);
  const symbolValue = useSignal<string>("");
  const intervalValue = useSignal<string>("");
  const btnDisabled = useComputed$(() => {
    if (symbolValue.value.length < 4 || intervalValue.value.length < 2) {
      return true;
    }
    return false;
  });

  const pairs = useGetPairs();
  // const action = useSearchPairInfo();
  const action = useStore({
    ok: false,
    failed: false,
    message: "",
    data: [],
    inAction: false,
    updateSearchPairInfo: $(async function (this: any) {
      if (btnDisabled.value) {
        this.failed = true;
        this.message = "Потрібно щось вибрати";
        return;
      }
      this.inAction = true;
      const resp = await axios.get(`http://127.0.0.1:8000/exchange/pair_info`, {
        params: {
          symbol: symbolValue.value,
          interval: intervalValue.value
        },
        headers: {
          Authorization: `Bearer ${auth.value}`
        },
        withCredentials: true
      });
      this.inAction = false;
      if (resp.status == 200) {
        this.data = resp.data;
        this.ok = true;
      }
      else if (resp.status == 401) {
        this.failed = true;
        auth.value = "";
        this.message = "Час сесії закінчився"
      }
      else {
        this.failed = true;
        this.message = "Виникла помилка. Зверніться до адміністрації"
      }
    })
  });

  return (
    <>
    {/* <Form action={action}> */}
      <div class="join">
      <div>
        <select name="symbol" class="select select-bordered join-item" bind:value={symbolValue}>
            <option disabled selected>
              Торгова пара
            </option>
            {pairs.value.ok ? pairs.value.data.map((symbol: any) => (
                <option key={symbol.symbol} value={symbol.symbol}>{symbol.symbol}</option>
                )) : <option>Немає API ключа</option>}
          </select> 
      </div>
      <select name="interval" class="select select-bordered join-item" bind:value={intervalValue}>
        <option disabled selected>Time</option>
        <option>1h</option>
        <option>2h</option>
        <option>4h</option>
      </select>
      <div class={`indicator ${btnDisabled.value ? 'tooltip tooltip-bottom' : ''}`} data-tip="Виберіть пару та інтервал">
        <button disabled={btnDisabled.value || action.inAction} class="btn join-item" onClick$={() => {action.updateSearchPairInfo()}}>GO <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
      </div>
    </div>
    {/* </Form> */}
    {action.failed ? <div class="alert alert-error mt-2">{action.message}</div> : null}
    {action.ok ? <div class="alert alert-success mt-2">Успішно отримано інформацію по парі</div> : null}
    <ul>
      {action.data.map((el: any) => (
        <li key={el}><ul class="alert alert-info mt-2">
            <li>Open time: {el[0]}</li>
            <li>Open price: {el[1]}</li>
            <li>High price: {el[2]}</li>
            <li>Low price: {el[3]}</li>
            <li>Close price: {el[4]}</li>
        </ul></li>
        
      ))}
    </ul>
    <OrderInputs symbol={symbolValue.value}/>
    </>
  );
});
