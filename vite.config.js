import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  pwa: {
    iconPaths: {
      favicon32: "img/icons/myFavicon.png",
    },
  },
});
