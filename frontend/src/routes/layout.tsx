import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";


export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});


export const getRegistration = routeAction$(async (data, requestEvent) =>{
  // console.log(data.password);
  // console.log(data.login);
  return fetch(`http://127.0.0.1:8000/auth/signup?login=${data.login}&password=${data.password}`, {
    method: "POST"
  }).then((resp) => {
    console.log(resp.status);
    if (resp.status == 200){
      return resp.json().then((d) => {return {"ok": resp.ok, "data": d}})
    } else{
      return {"ok": false, "data": null}
    }
  });
});

export const useSignin = routeAction$(async (data) => {
  return fetch(`http://127.0.0.1:8000/auth/signin?login=${data.login}&password=${data.password}`, {method: "POST"}).then(async (resp) => {
    let ok = false;
    let data = null;
    if (resp.status == 200) {
      ok = true;
      data = await resp.json();
    }
    // console.log({"ok": ok, "data": data});

    return {"ok": ok, "data": data}
  });
});


export default component$(() => {
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
