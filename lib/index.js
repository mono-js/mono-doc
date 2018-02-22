const { Nuxt } = require('nuxt')

module.exports = ({ conf, app, log, hook }) => {
  const config = require('../nuxt.config')
  config.dev = conf.env !== 'production'

  hook('ready', ({ routes }) => {
    const nuxt = new Nuxt(config)

    app.use('/documentation', (req, res) => {
      req.routes = routes

      nuxt.render(req, res)
    })
  })
}
