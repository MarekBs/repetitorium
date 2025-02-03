import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";  // Opravený import

// Dynamické nastavenie základnej cesty
const basePath = process.env.NODE_ENV === "production" ? "/medTest/" : "/";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatické aktualizácie service worker-a
      workbox: {
        runtimeCaching: [
          {
            // Cachovanie všetkých súborov v priečinku public (aj podpriečinky)
            urlPattern: /\/.*\/.*\.(?:js|css|html|json|txt|jpg|jpeg|png|svg|gif|webp|mp4|woff2?)$/,  // Cachovanie všetkých súborov, aj v podpriečinkoch
            handler: 'CacheFirst', // Najskôr kontroluje cache, ak nie je, pošle požiadavku na server
            options: {
              cacheName: 'public-assets-cache',
              expiration: {
                maxEntries: 100,  // Maximálny počet položiek v cache
                maxAgeSeconds: 60 * 60 * 24 * 30, // Maximálna doba uchovávania súborov (30 dní)
              },
            },
          },
        ],
      },
    }),
  ],
  base: basePath,  // Dynamické nastavenie základnej cesty
});
