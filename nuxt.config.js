module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mono Doc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Mono Doc' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome'
  ],
  /*
  ** Axios config
  */
  axios: {
    credentials: false
  },
  /*
  ** CSS
  */
  css: [
    'highlight.js/styles/dracula.css',
    '~/assets/main.scss'
  ],
  /*
  ** Plugins
  */
  plugins: [
    { src: '~/plugins/highlight', ssr: false },
    { src: '~/plugins/scrollspy', ssr: false }
  ],
  /*
  ** Router config
  */
  router: {
    scrollBehavior: () => false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
