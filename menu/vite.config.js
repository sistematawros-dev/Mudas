import { defineConfig } from "vite";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("apexcharts")) return "apexcharts";
          return "vendor";
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
});
