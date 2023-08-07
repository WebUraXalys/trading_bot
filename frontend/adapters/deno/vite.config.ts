import { denoServerAdapter } from "@builder.io/qwik-city/adapters/deno-server/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.deno.ts", "@qwik-city-plan"],
      },
      minify: false,
    },
    plugins: [
      denoServerAdapter({
        ssg: {
          include: ["/*"],
          origin: "https://2b2d-192-162-33-129.ngrok-free.app",
        },
      }),
    ],
  };
});
