// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  devtools: { enabled: true },
  runtimeConfig: {
    signflowApiBaseUrl:
      process.env.SIGNFLOW_API_BASE_URL ||
      "https://api.usesignflow.com",
  },
});
