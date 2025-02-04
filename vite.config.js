import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const basePath = process.env.NODE_ENV === "production" ? "/medTest/" : "/";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW", // Automaticky generuje service worker
      workbox: {
        globPatterns: ["otazkyPng/**/*.{png,jpg,svg,gif,webp}"], // Precachovanie obrázkov v public/otazkyPng/
        globDirectory: "public", // Vyhľadávanie v priečinku public/
        runtimeCaching: [
          {
            urlPattern: /\/otazkyPng\/.*\.(?:png|jpg|svg|gif|webp)$/, // Dynamické cachovanie obrázkov
            handler: "CacheFirst",
            options: {
              cacheName: "otazky-cache",
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dní
              },
            },
          },
        ],
      },
      includeAssets: ["favicon.ico", "robots.txt"], // Extra statické súbory
      manifest: {
        name: "MedTest PWA",
        short_name: "MedTest",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: basePath,
});



