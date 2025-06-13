import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // 상대 경로로 설정해야 Firebase에서도 정상 작동
  plugins: [vue()],
});
