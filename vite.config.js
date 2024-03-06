import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
import ElementPlus from 'unplugin-element-plus/vite';
import electron from "vite-plugin-electron";
import renderer from 'vite-plugin-electron-renderer'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
      ElementPlus(),
      electron({
         entry: 'electron/main/index.js',
      }),
      renderer(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "/images": "src/assets/images",
      },
    },
    server: {
      open: false,
      port: 3004,
      proxy: {
        "/api": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY == "true",
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
  };
});
