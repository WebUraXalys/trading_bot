import { component$, useContext } from "@builder.io/qwik";
import { themeContext } from "~/routes/layout";



export default component$(() => {
    const theme = useContext(themeContext);

    return (
        <>
        {/* data-theme={theme.value == "dark" ? "light" : "dark"} */}
            {/* <button class="btn btn-secondary btn-outline" onClick$={() => {
                if (theme.value == "dark") {
                    theme.value = "light";
                }
                else {
                    theme.value = "dark";
                }
            }}>Змінити тему</button> */}
            <input type="checkbox" class="toggle" checked onClick$={() => {
                if (theme.value == "dark") {
                    theme.value = "light";
                }
                else {
                    theme.value = "dark";
                }
            }} />
        </>
    )
});
