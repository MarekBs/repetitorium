import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const basePath = process.env.NODE_ENV === "production" ? "/medTest/" : "/";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatické aktualizácie service worker-a
      workbox: {
        runtimeCaching: [
          {
            // Cachovanie všetkých súborov v priečinku public (aj podpriečinky)
            urlPattern: /\/.*\/.*\.(?:js|css|html|json|txt|jpg|jpeg|png|svg|gif|webp|mp4|woff2?)$/,
            handler: "CacheFirst", // Najskôr kontroluje cache, ak nie je, pošle požiadavku na server
            options: {
              cacheName: "public-assets-cache",
              expiration: {
                maxEntries: 300, // Zvýšenie limitu pre väčší počet obrázkov
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dní uchovávania v cache
              },
            },
          },
        ],
      },
      includeAssets: ["favicon.ico", "robots.txt"], // Dodatočné statické súbory
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
      strategies: "injectManifest", // Manuálna konfigurácia cachovania
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,gif,webp,mp4,woff2}"], // Prednačítanie všetkých súborov
        globDirectory: "public", // Vyhľadávanie v priečinku public/
      },
    }),
  ],
  base: basePath, // Dynamické nastavenie základnej cesty
});

