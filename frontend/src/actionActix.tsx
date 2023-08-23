import { $, type QRL, type Signal } from "@builder.io/qwik";

export type actionStore = {
    inAction: boolean,

    ok?: boolean,
    data?: any,

    failed?: boolean,
    message?: string,

    readonly endpoint_url: string,
    updateGetAction: typeof updateGetAction,
};

export const updateGetAction = $(async function (this: actionStore, resp_fn: any, auth: Signal<string>) {
    this.inAction = true;
    const resp = await resp_fn(this);
    this.inAction = false;

    if (resp.status == 200) {
        this.data = resp.data;
        this.ok = true;
    }

    if (resp.status == 401) {
        this.failed = true;
        this.message = "Час сесії закінчився";
        auth.value = "";
    }

    else {
        this.failed = true;
        this.message = "Сталась помилка, зверніться до адміністрації";
    }
});