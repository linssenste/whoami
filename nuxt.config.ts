// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: true,
    prerender: {
        crawlLinks: true
      }
  },
  plugins: [
    '~/plugins/random-favicon.client.ts'
  ],
  components: [
    // Auto-import components in the components directory
    { path: '~/components', pathPrefix: true },
    // Auto-import components in the sections directory
    { path: '~/sections', pathPrefix: false },
  ],
  app: {
    head: {
      script: [
        {
          src: 'https://open.spotify.com/embed/iframe-api/v1',
          async: true
        }
      ]
    }
  },
  modules: ['nuxt-lazy-load', '@nuxtjs/leaflet', '@pinia/nuxt'],
  lazyLoad: {
    // These are the default values
    images: false,
    videos: false,
    audios: false,
    iframes: false,
    native: false,
    directiveOnly: true,
  },

  css: ['~/assets/css/main.css', '~/assets/font/buttons/stylesheet.css', '~/assets/font/biro/stylesheet.css', '~/assets/font/text/stylesheet.css']
})