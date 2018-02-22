const { Nuxt } = require('nuxt')

module.exports = ({ conf, app, log, hook }) => {
  const config = require('../nuxt.config')

  hook('ready', ({ routes }) => {
    const nuxt = new Nuxt(config)

    app.use('/documentation', (req, res, next) => {
      req.routes = routes

      return next()
    }, nuxt.render)
  })
}
