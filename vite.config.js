import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const basePath = process.env.NODE_ENV === "production" ? "/medTest/" : "/";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW", // Zmena na generateSW, ktorý automaticky vytvorí service worker
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,gif,webp,mp4,woff2}"],
        globDirectory: "public",
        runtimeCaching: [
          {
            urlPattern: /\/.*\/.*\.(?:js|css|html|json|txt|jpg|jpeg|png|svg|gif|webp|mp4|woff2?)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "public-assets-cache",
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
  base: basePath,
});


