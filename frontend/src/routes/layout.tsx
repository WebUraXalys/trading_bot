import type { Signal } from "@builder.io/qwik";
import { component$, Slot, useSignal, useContextProvider, createContextId, useComputed$, useTask$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, zod$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Cookies from "js-cookie";
import { isBrowser } from "@builder.io/qwik/build";


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


export const useCheckAuth = routeLoader$(async (requestEvent) => {
  const cook = requestEvent.cookie.get("auth");
  if (cook == null) {
    return "";
  }
  else {
    return cook.value;
  }
});

export const useGetTheme = routeLoader$(async (requestEvent) => {
  const cook = requestEvent.cookie.get("data-theme");
  if (cook == null) {
    return "dark";
  }
  else {
    return cook.value;
  }
});


export const useGetAPIKeys = routeLoader$(async (requestEvent) => {
  if (requestEvent.cookie.has("auth")) {
    const userAuth = requestEvent.cookie.get("auth");
    const res = await fetch(`http://127.0.0.1:8000/user/settings`, {
    method: "get",
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${userAuth}`
    }
    }).then(async (r) => {return await r.json()});
    if (res.status == 200) {
      return {"ok": true, "apikey": res.apikey, "secretkey": res.secretkey};
    }
    else {
      return {"unauthorized": true};
    }
  }
  else {
    return {"unauthorized": true};
  }
});


export const useSignUp = routeAction$(async (data) =>{
  // console.log(data.password);
  // console.log(data.login);
  return fetch(`http://127.0.0.1:8000/auth/signup?login=${data.login}&password=${data.password}`, {
    method: "POST"
  }).then((resp) => {
    console.log(resp.status);
    if (resp.status == 200){
      return resp.json().then((d) => {return {"ok": resp.ok, "data": d}})
    } else {
      return {"ok": false, "data": null}
    }
  });
},
zod$((z) => {
  return z.object({
    login: z.string().min(3, "менше 3 символів"),
    password: z.string().min(12, "менше 12 символів"),
    password2: z.string().min(12)
  }).refine((data) => data.password == data.password2, "Паролі не співпадають");
})
);

export const useSignIn = routeAction$(async (data, { fail }) => {
  return fetch(`http://127.0.0.1:8000/auth/signin?login=${data.login}&password=${data.password}`, {method: "POST"}).then(async (resp) => {
    if (resp.status == 200) {
      const data = await resp.json();
      return {"ok": true, "data": data}
    }
    else {
      return fail(401, {message: "Неправильний логін або пароль"});
    }
  });
},
zod$((z) => {
  return z.object({
    login: z.string().min(3, "менше 3 символів"),
    password: z.string().min(12, "менше 12 символів"),
  })
})
);

export const authContext = createContextId<Signal<string>>("ac");
export const themeContext = createContextId<Signal<string>>("theme");

export default component$(() => {
  const av = useCheckAuth().value;
  const auth = useSignal(av);
  useContextProvider(authContext, auth);
  useComputed$(() => {
    Cookies.set("auth", auth.value, {sameSite: "strict", secure: true, "Max-Age": "3600"});
  });

  const lsTheme = useGetTheme().value;
  const theme = useSignal(lsTheme);
  useTask$(({ track }) => {
    track(() => {theme.value})
    if (isBrowser) {
      Cookies.set("data-theme", theme.value, {"Max-Age": "7776000"})
    }
  });
  useContextProvider(themeContext, theme);

  return (
    <>
      <main data-theme={theme.value}>
        <Slot />
      </main>
    </>
  );
});
