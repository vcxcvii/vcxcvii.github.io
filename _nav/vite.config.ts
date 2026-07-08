import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Builds the nav island as a single IIFE bundle (react bundled, no externals)
// straight into the Jekyll-served asset dirs. GitHub Pages can't run this —
// the emitted files are committed. Rebuild: `npm run build`.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: path.resolve(__dirname, "../assets"),
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/nav-island.tsx"),
      formats: ["iife"],
      name: "VcxcviiNav",
      fileName: () => "js/nav.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (asset) =>
          asset.name && asset.name.endsWith(".css")
            ? "css/nav.css"
            : "assets/[name][extname]",
      },
    },
  },
});
