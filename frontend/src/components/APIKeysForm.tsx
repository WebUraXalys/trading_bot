import { component$, useSignal, useComputed$, useContext } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSaveKeys } from "~/routes/layout";
import { useGetAPIKeys } from "~/routes/layout";
import { authContext } from "~/routes/layout";


export default component$(() => {
  const signal = useGetAPIKeys();
  const apiKey = signal.value.api_key;
  const secretKey = signal.value.secret_key;
  const action = useSaveKeys();
  const valueAPIKey = useSignal(apiKey);
  const valueAPISecret = useSignal(secretKey);
  const auth = useContext(authContext);

  const btnDisabled = useComputed$(() => {
    if (valueAPIKey.value != apiKey || secretKey != valueAPISecret.value) {
      return false;
    }
    else {
      return true;
    }
  });

    return (
      <>
      <div class="pt-[10%]">
        <Form action={action}>
            <div class="text-center ">
                <h1 class="text-2xl font-bold">API Ключі</h1>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto mt-2">
              <div class="card-body">
              {auth.value.length < 8 ?
                <div class=" text-md">Спочатку ввійдіть в акаунт</div>
                :
                <>
                  <div class="form-control w-full max-w-xs">
                      <label class="label">
                        <span class="label-text">API Ключ</span>
                        {/* <span class="label-text-alt">Top Right label</span> */}
                      </label>
                      <input type="text" placeholder="API key" class="input input-bordered w-full max-w-xs" bind:value={valueAPIKey} name="api_key" />
                    </div><div class="form-control w-full max-w-xs">
                        <label class="label">
                          <span class="label-text">Секретний ключ</span>
                          {/* <span class="label-text-alt">Top Right label</span> */}
                        </label>
                        <input type="text" placeholder="Secret key" class="input input-bordered w-full max-w-xs" bind:value={valueAPISecret} name="secret_key" />
                      </div><div class="form-control mt-6">
                        <span class="tooltip w-full" data-tip={btnDisabled.value&&!action.value?.ok? "Внесіть зміни":null}>
                          <button class="btn btn-primary w-full" type="submit" disabled={btnDisabled.value}>Зберегти</button>
                        </span>
                        {action.value?.failed ? <div class="alert alert-error mt-4">{action.value.message}</div> : <></>}
                        {action.value?.ok ? <div class="alert alert-success mt-4">Збережено</div> : <></>}
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
