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
    console.log(resp);
    this.inAction = false;

    if (resp.status === 200) {
        this.data = resp.data;
        this.ok = true;
    }
    else if (resp.status === 401) {
        this.failed = true;
        this.message = "Час сесії закінчився. Вам потрібно заново ввійти вакаунт"
        auth.value = "";
    }
    else if (resp.status === 406) {
        this.failed = true;
        this.message = resp.data.detail
    }
    else if (resp.status === 422) {
        this.failed = true;
        this.message = resp.data.detail[0].msg;
    }
    else {
        this.failed = true;
        this.message = "Сталась помилка, зверніться до адміністрації";
    }
});