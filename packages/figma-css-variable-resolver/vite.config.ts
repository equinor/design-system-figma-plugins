import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2019",
    outDir: "dist",
    assetsDir: "",
    sourcemap: true,
    rollupOptions: {
      input: "/src/index.ts",
      output: {
        entryFileNames: `index.js`, // specify the output file name
      },
    },
  },
});
