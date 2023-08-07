import { component$, useSignal, useTask$, useComputed$, useContext } from "@builder.io/qwik";
import { Form, useNavigate, Link } from "@builder.io/qwik-city";
import { useSignUp } from "~/routes/layout";
import { routeLoader$ } from '@builder.io/qwik-city';
import { isBrowser } from "@builder.io/qwik/build"
import { useGetAPIKeys } from "~/routes/layout";
import { authContext } from "~/routes/layout";


export default component$(() => {
  const initialState = useGetAPIKeys();
  const action = useSignUp();
  const valueAPIKey = useSignal(initialState.value.apikey);
  const valueAPISecret = useSignal(initialState.value.secretkey);
  const auth = useContext(authContext);
  const btnDisabled = useComputed$(() => {
    if (valueAPIKey.value != initialState.value.apikey || initialState.value.secretkey != valueAPISecret.value) {
      return false;
    }
    else {
      return true;
    }
  });

    return (
      <>
      <div class="min-h-screen bg-base-200 pt-[10%]">
        <Form>
            <div class="text-center ">
                <h1 class="text-5xl font-bold">API Ключі</h1>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-5">
              <div class="card-body">
              {auth.value.length < 8 ?
                <div class=" text-xl">Спочатку ввійдіть в акаунт</div>
                :
                <>
                  <div class="form-control w-full max-w-xs">
                      <label class="label">
                        <span class="label-text">API Ключ</span>
                        {/* <span class="label-text-alt">Top Right label</span> */}
                      </label>
                      <input type="text" placeholder="API key" class="input input-bordered w-full max-w-xs" bind: value={valueAPIKey} />
                    </div><div class="form-control w-full max-w-xs">
                        <label class="label">
                          <span class="label-text">Секретний ключ</span>
                          {/* <span class="label-text-alt">Top Right label</span> */}
                        </label>
                        <input type="text" placeholder="Secret key" class="input input-bordered w-full max-w-xs" bind: value={valueAPISecret} />
                      </div><div class="form-control mt-6">
                        <span class="tooltip w-full" data-tip={btnDisabled.value&&!action.value?.failed? "Немає що змінювати":null}>
                          <button class="btn btn-primary w-full" type="submit" disabled={btnDisabled.value}>Зберегти</button>
                        </span>
                        {/* {action.value?.failed ? <div class="alert alert-error mt-4">{action.value.message}</div> : <></>} */}
                      </div>
                </>
              }
              </div>
            </div>
        </Form>
      </div>
      </>
    )
});
