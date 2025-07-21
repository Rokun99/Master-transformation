import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  // Lädt Umgebungsvariablen aus der .env-Datei
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-maskable-icon.svg'],
        manifest: {
          name: 'Master Kreativität: 30 Tage Programm',
          short_name: 'Master Kreativität',
          description: 'An interactive web app for a 30-day creativity challenge.',
          theme_color: '#5a4fcf',
          background_color: '#f8f9fe',
          display: "standalone",
          scope: "/",
          start_url: "/",
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-maskable-icon.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      })
    ],
    define: {
      // Die Gemini API-Richtlinien erfordern die Verwendung von process.env.API_KEY.
      // Vite verwendet import.meta.env für Umgebungsvariablen.
      // Diese 'define'-Eigenschaft macht den VITE_GEMINI_API_KEY im
      // Browser-Code als process.env.API_KEY verfügbar und erfüllt so die Anforderung.
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    }
  };
})