const { Nuxt } = require('nuxt')
const { Hooks } = require('@terrajs/mono')

module.exports = ({ conf, app, log }) => {
  const config = require('../nuxt.config')
  config.dev = conf.env !== 'production'

  const hooks = new Hooks(log)

  hooks.hook('ready', ({ routes }) => {
    console.log('routes', routes)
    const nuxt = new Nuxt({ routes, ...config })

    app.use('/documentation', nuxt.render)
  })
}
