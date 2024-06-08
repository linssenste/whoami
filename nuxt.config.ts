// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
	'nuxt-lazy-load'
  ],
  lazyLoad: {
	// These are the default values
	images: true,
	videos: true,
	audios: true,
	iframes: true,
	native: false,
	directiveOnly: true,
  },
  
  css: ['~/assets/css/main.css', '~/assets/font/buttons/stylesheet.css', '~/assets/font/biro/stylesheet.css', '~/assets/font/text/stylesheet.css']
})
