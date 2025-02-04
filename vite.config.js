import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const basePath = process.env.NODE_ENV === "production" ? "/medTest/" : "/";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW", // Automatically generates service worker
      workbox: {
        globPatterns: [
          "otazkyPng/**/*.{png,jpg,svg,gif,webp}", // Images
          "index.html", // Ensure index.html is included
          "**/*.{js,css}", // Cache JS and CSS files
          "**/*.txt", // Add .txt files to be cached
          "logoMED.svg", // Add logoMED.svg to be cached
        ],
        globDirectory: "dist", // Look in the dist directory (final production output)
        runtimeCaching: [
          {
            urlPattern: /\/otazkyPng\/.*\.(?:png|jpg|svg|gif|webp)$/, // Dynamic caching of images
            handler: "CacheFirst",
            options: {
              cacheName: "otazky-cache",
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      includeAssets: ["favicon.ico", "robots.txt", "index.html"], // Add index.html here
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


