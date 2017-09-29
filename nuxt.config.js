module.exports = {
  mode: 'spa', // TODO: Remove
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
    '~/plugins/highlight',
    { src: '~/plugins/scrollspy', ssr: false }
  ],
  /*
  ** Env
  */
  env: {
  },
  /*
  ** Server middleware
  */
  serverMiddleware: [
  ],
  router: {
    scrollBehavior: () => false
  },
  /*
  ** Build configuration
  */
  build: {
    plugins: [
    ],
    babel: {
      // plugins: ['lodash']
    },
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
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
