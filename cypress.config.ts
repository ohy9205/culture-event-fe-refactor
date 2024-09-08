import { defineConfig } from "cypress";

const baseUrl = "http://localhost:3000";

export default defineConfig({
  e2e: {
    baseUrl,
    setupNodeEvents(on, config) {},
  },
  env: {
    baseUrl,
  },
});
