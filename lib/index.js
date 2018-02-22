const { Nuxt } = require('nuxt')
const config = require('../nuxt.config')

module.exports = ({ conf, app, log, hook }) => {
  let reqRoutes = []
  const nuxt = new Nuxt(config)

  app.get('/_doc', (req, res) => {
    req.routes = reqRoutes

    nuxt.render(req, res)
  })

  hook('ready', ({ routes }) => {
    reqRoutes = routes
  })
}
