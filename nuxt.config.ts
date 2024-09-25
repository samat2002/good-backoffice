

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  build: {
    // extractCSS: false,
    transpile: ["vuetify"],
  },
  css: ["@/assets/scss/style.scss"],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: [
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      // apiBaseUrl: 'https://rvscs-develop.com/revel-service',
      apiBaseUrl: 'http://localhost:5260',
    }
  }
});
