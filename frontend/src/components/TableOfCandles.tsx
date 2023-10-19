import { component$, useStore, useContext, useSignal, $, useComputed$ } from "@builder.io/qwik";
import { useGetPairs } from "~/routes/layout";
import axios from 'axios';
import { authContext } from "~/routes/layout";


export default component$(() => {
  const auth = useContext(authContext)
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
<div class="overflow-x-auto">
  <table class="table table-pin-rows table-pin-cols table-sm w-[95%]">
    <thead>
      <tr>
        <th></th> 
        <td>Open time:</td> 
        <td>Open price:</td> 
        <td>High price:</td> 
        <td>Low price:</td> 
        <td>Close price:</td>  
      </tr>
    </thead> 
    <tbody>
      <tr>
        <th>1</th> 
        <td>1692795600000</td> 
        <td>26781.60</td> 
        <td>26880</td> 
        <td>26430</td> 
        <td>26580.30</td> 
      </tr>
      <tr>
        <th>2</th> 
        <td>1692799200000</td> 
        <td>26728.40</td> 
        <td>26900</td> 
        <td>26495.40</td> 
        <td>26849</td> 
      </tr>
      <tr>
        <th>3</th> 
        <td>1692802800000</td> 
        <td>26849</td> 
        <td>27142.80</td> 
        <td>26559</td> 
        <td>26899.90</td> 
      </tr>
      <tr>
        <th>4</th> 
        <td>Marjy Ferencz</td> 
        <td>Office Assistant I</td> 
        <td>Rowe-Schoen</td>  
      </tr>
      <tr>
        <th>5</th> 
        <td>Yancy Tear</td> 
        <td>Community Outreach Specialist</td> 
        <td>Wyman-Ledner</td> 
        <td>Brazil</td> 
        <td>5/22/2020</td> 
      </tr>
      <tr>
        <th>6</th> 
        <td>Irma Vasilik</td> 
        <td>Editor</td> 
        <td>Wiza, Bins and Emard</td> 
        <td>Venezuela</td> 
        <td>12/8/2020</td>  
      </tr>
      <tr>
        <th>7</th> 
        <td>Meghann Durtnal</td> 
        <td>Staff Accountant IV</td> 
        <td>Schuster-Schimmel</td> 
        <td>Philippines</td> 
        <td>2/17/2021</td> 
      </tr>
      <tr>
        <th>8</th> 
        <td>Sammy Seston</td> 
        <td>Accountant I</td> 
        <td>O'Hara, Welch and Keebler</td> 
        <td>Indonesia</td> 
        <td>5/23/2020</td> 
      </tr>
      <tr>
        <th>9</th> 
        <td>Lesya Tinham</td> 
        <td>Safety Technician IV</td> 
        <td>Turner-Kuhlman</td> 
        <td>Philippines</td> 
        <td>2/21/2021</td> 
      </tr>
      <tr>
        <th>10</th> 
        <td>Zaneta Tewkesbury</td> 
        <td>VP Marketing</td> 
        <td>Sauer LLC</td> 
        <td>Chad</td> 
        <td>6/23/2020</td> 
      </tr>
    </tbody> 
  </table>
</div>

    {/* {action.failed ? <div class="alert alert-error mt-2">{action.message}</div> : null}
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
    </ul> */}
    </>
  );
});
